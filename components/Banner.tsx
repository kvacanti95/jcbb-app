export default function Banner({ message }: { message: string }) {
  return (
    <div className="bg-gold px-4 py-2 text-center text-sm font-semibold text-jetblack">
      {message}
    </div>
  );
}
