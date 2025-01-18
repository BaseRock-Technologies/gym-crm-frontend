import { AdminOnlyEdit } from "@/types/form";
import { User } from "@/types/query";
import Link from "next/link";

interface EditClientDetailsProps {
  adminEditRules: AdminOnlyEdit;
  user: User;
}

const EditClientDetails: React.FC<EditClientDetailsProps> = ({
  adminEditRules,
  user,
}) => {
  if (
    adminEditRules &&
    adminEditRules.adminOnlyEdit &&
    user &&
    user.role !== "admin" &&
    adminEditRules.redirectPath
  ) {
    // Determine the redirection path
    const redirectPath = adminEditRules.memberId
      ? `${adminEditRules.redirectPath}/${adminEditRules.memberId}`
      : adminEditRules.redirectPath;

    return (
      <p className="font-bold">
        <span className="text-red-500">Only admin can edit - </span>
        <Link
          href={redirectPath}
          className="border-b-2 border-red-500 text-red-500"
        >
          Edit Client Details
        </Link>
      </p>
    );
  }

  return <></>;
};

export default EditClientDetails;
