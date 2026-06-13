type Props = {
  id: string;
  message?: string;
  className: string;
};

export default function ContactLeadFieldError({ id, message, className }: Props) {
  if (!message) return null;
  return (
    <p id={id} className={className} role="alert">
      {message}
    </p>
  );
}
