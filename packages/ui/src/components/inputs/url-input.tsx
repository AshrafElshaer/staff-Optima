import { Input, type InputProps } from "../input";

export const UrlInput = ({ error, ...props }: InputProps) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Input {...props} className="peer ps-16" type="text" />
        <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-secondary-foreground peer-disabled:opacity-50">
          https://
        </span>
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};
