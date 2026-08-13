export default function Banner({
  message,
  bgColor,
  textColor,
}: {
  message: string;
  bgColor: string;
  textColor: string;
}) {
  return (
    <div
      className="px-4 py-2 text-center text-sm font-semibold"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {message}
    </div>
  );
}
