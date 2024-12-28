import { type UserAccessRole, userRoleEnum } from "@optima/supabase/types";
import { cn } from "@optima/ui/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@optima/ui/select";

const rolesDescription: Record<UserAccessRole, string> = {
  admin: "Full organization access",
  recruiter: "Manage jobs, interviews and candidates",
  hiring_manager: "View jobs, interviews and candidates",
  interviewer: "Conduct interviews and provide feedback",
};

type AccessRoleSelectorProps = {
  value: UserAccessRole;
  onChange: (value: UserAccessRole) => void;
  error?: string;
};
export const AccessRoleSelector = ({
  value,
  onChange,
  error,
}: AccessRoleSelectorProps) => {
  return (
    <div className="space-y-2">
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger
          className={cn(
            "[&_[data-desc]]:hidden",
            error ? "border-destructive" : "",
          )}
        >
          <SelectValue placeholder="Choose access role" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          {Object.values(userRoleEnum).map((role) => (
            <SelectItem key={role} value={role}>
              <span className="capitalize">{role.replace("_", " ")}</span>
              <span
                className="mt-1 block text-xs text-secondary-foreground text-wrap"
                data-desc
              >
                {rolesDescription[role]}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
};
