'use client';

import { useCallback, useRef, useState } from 'react';
import Cropper, { type Area } from 'react-easy-crop';

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (err) => reject(err));
    image.src = url;
  });
}

async function cropToBlob(imageSrc: string, area: Area): Promise<Blob> {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement('canvas');
  canvas.width = area.width;
  canvas.height = area.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  ctx.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, area.width, area.height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Failed to crop image'))),
      'image/jpeg',
      0.9,
    );
  });
}

export default function ImageCropInput({
  name,
  label,
  existingPhotoUrl,
}: {
  name: string;
  label: string;
  existingPhotoUrl?: string | null;
}) {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLInputElement>(null);

  function handlePick(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSourceImage(reader.result as string);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    };
    reader.readAsDataURL(file);
  }

  const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedArea(areaPixels);
  }, []);

  async function confirmCrop() {
    if (!sourceImage || !croppedArea) return;
    const blob = await cropToBlob(sourceImage, croppedArea);
    const file = new File([blob], `${name}.jpg`, { type: 'image/jpeg' });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }

    setPreviewUrl(URL.createObjectURL(blob));
    setSourceImage(null);
  }

  function cancelCrop() {
    setSourceImage(null);
    if (pickerRef.current) pickerRef.current.value = '';
  }

  const displayUrl = previewUrl ?? existingPhotoUrl;

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-white">
        {label} <span className="text-white/40">(optional)</span>
      </label>

      {displayUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={displayUrl}
          alt="Current photo"
          className="mb-2 h-32 w-32 rounded-md object-cover"
        />
      )}

      {/* Hidden input actually submitted with the form — populated with the cropped result */}
      <input ref={fileInputRef} type="file" name={name} className="hidden" />

      <input
        ref={pickerRef}
        type="file"
        accept="image/*"
        onChange={handlePick}
        className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
      />

      {sourceImage && (
        <div className="mt-3 rounded-md border border-white/20 bg-black/40 p-3">
          <div className="relative h-64 w-full overflow-hidden rounded-md bg-black">
            <Cropper
              image={sourceImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="mt-3 w-full"
            aria-label="Zoom"
          />
          <div className="mt-3 flex gap-3">
            <button
              type="button"
              onClick={confirmCrop}
              className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-jetblack"
            >
              Use This Crop
            </button>
            <button
              type="button"
              onClick={cancelCrop}
              className="rounded-md border border-white/20 px-4 py-2 text-sm text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
