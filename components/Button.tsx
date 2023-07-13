import { experimental_useFormStatus as useFormStatus } from "react-dom";

const Button = ({ value, ...props }: { value: string }) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      disabled={pending}
      className="bg-amber-500 py-2 px-4 rounded-md text-black disabled:bg-gray-500 disabled:text-white items-center flex gap-x-2"
    >
      {pending && <span className="loading loading-spinner text-accent" />}
      {value}
    </button>
  );
};

export default Button;
