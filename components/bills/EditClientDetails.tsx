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
      <p>
        <Link href={redirectPath}>Edit Client Details</Link> -{" "}
        <span>only admin can edit</span>
      </p>
    );
  }

  return <></>;
};

export default EditClientDetails;
