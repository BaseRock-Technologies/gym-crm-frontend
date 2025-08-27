import { useParams } from "next/navigation";
import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { profileFormConfig } from "../constants";
import { DynamicForm } from "@/components/dynamic-form";
import { useAuth } from "@/lib/context/authContext";
import { post } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import { SelectApiData } from "@/types/form";
import { StatusResponse } from "@/types/query";

const Profile = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const { user } = useAuth();
  const [initialData, setInitialData] = React.useState<Record<
    string,
    any
  > | null>(null);

  const apiConfig: SelectApiData = {
    apiPath: "client/update",
    method: "POST",
    postData: {
      memberId: memberId,
    },
  };

  React.useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res: StatusResponse = await post(
          { memberId: memberId },
          "client/profile",
          "Failed to fetch profile"
        );
        if (res.status === "success" && res.data) {
          // Add 1 second delay for better loader experience
          setTimeout(() => setInitialData(res.data), 1000);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        showToast("error", "Failed to load data");
      }
    };
    profileFormConfig.title = "Profile Information";
    fetchInitialData();
  }, [user]);

  if (!initialData) {
    return (
      <div className="flex flex-col justify-center items-center h-60">
        <Spinner />
        <span className="mt-4 text-gray-500 text-lg font-medium animate-pulse">Loading profile...</span>
      </div>
    );
  }
  return (
    <div className="relative p-6 flex flex-col gap-6">
      <DynamicForm
        config={profileFormConfig}
        submitBtnText="Save"
        initialData={initialData}
        apiData={apiConfig}
        resetOnSubmit={false}
        canSaveTheForm={false}
      />
    </div>
  );
};

export default Profile;
