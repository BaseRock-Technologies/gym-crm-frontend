import { useParams } from "next/navigation";
import React from "react";
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
          setInitialData(res.data);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        showToast("error", "Failed to load data");
      }
    };
    profileFormConfig.title = "Profile Information";
    fetchInitialData();
  }, [user]);

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
