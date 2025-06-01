"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { format, differenceInDays } from "date-fns";
import { post } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import SpinnerTick from "../Images/SpinnerTick";
import { formatTimestamp } from "@/utils/date-utils";

interface FreezeMembershipProps {
  isOpen: boolean;
  onClose: () => void;
  data: any | null; // Replace with proper type
}

interface FreezeData {
  billId: string;
  billType: string;
  fromDate: string;
  toDate: string;
  daysAllotted: number;
  packageName: string;
  expDate: string;
}

const FreezeMembership: React.FC<FreezeMembershipProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [freezeData, setFreezeData] = useState<FreezeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { fromDate: freezeHistoryFromDate, endDate: freezeHistoryEndDate } =
    data && data.history
      ? data.history.freezeHistory[0]
      : { fromDate: 0, endDate: 0 };

  useEffect(() => {
    if (data) {
      const formattedData = Array.isArray(data) ? data : [data];
      setFreezeData(
        formattedData.map((item) => ({
          billId: item.billId || "",
          billType: item.billType,
          fromDate: format(new Date(), "yyyy-MM-dd"),
          toDate: format(new Date(), "yyyy-MM-dd"),
          daysAllotted: 0,
          packageName: item.packageName || "",
          expDate: item.endDate || "",
        }))
      );
    }
  }, [data]);

  const handleDateChange = (
    index: number,
    field: "fromDate" | "toDate",
    value: Date | undefined
  ) => {
    if (!value) return;

    setFreezeData((prev) => {
      const newData = [...prev];
      const formattedDate = format(value, "yyyy-MM-dd");
      newData[index] = {
        ...newData[index],
        [field]: formattedDate,
        daysAllotted: calculateDays(
          field === "fromDate" ? formattedDate : newData[index].fromDate,
          field === "toDate" ? formattedDate : newData[index].toDate
        ),
      };
      return newData;
    });
  };

  const calculateDays = (fromDate: string, toDate: string) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    return Math.max(0, differenceInDays(end, start));
  };

  const handleFreeze = async (index: number) => {
    const item = freezeData[index];
    if (item.daysAllotted > 0) {
      setLoading(true);
      try {
        const response = await post(
          {
            billId: item.billId.toString(),
            packageName: item.packageName,
            daysAllotted: item.daysAllotted,
            billType: item.billType,
          },
          "bills/membership/freeze",
          "Failed to freeze membership"
        );

        if (response.status === "success") {
          onClose();
          showToast("success", "Membership frozen successfully", {
            toastId: "20a2cb8b-b0d5-4465-8ded-f4b8594a6ce1",
          });
        }
      } catch (error) {
        console.error("Error freezing membership:", error);
        showToast("error", "Failed to freeze membership", {
          toastId: "a4a089a7-dc06-4840-a2b0-3b01dc58cab3",
        });
      } finally {
        setLoading(false);
      }
    } else {
      showToast("info", "No changes made", {
        toastId: "2a26f893-f065-4696-9f2d-1649c1034879",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl pb-10">
        {loading && (
          <div className="absolute w-full h-full flex justify-center items-center z-[99] bg-black/10">
            <SpinnerTick color="#2b2d42" />
          </div>
        )}
        <Card className="w-full h-full mt-4 mx-auto border-none rounded-md overflow-hidden shadow-md">
          <CardHeader className="bg-primary text-white mb-5 shadow-sm">
            <CardTitle>Freeze Membership</CardTitle>
          </CardHeader>
          <CardContent className="container">
            <DialogTitle className="hidden">Freeze Membership</DialogTitle>
            {freezeHistoryFromDate && freezeHistoryEndDate && (
              <p className="relative text-xs text-red-500 my-2">
                Already Freezed from {formatTimestamp(freezeHistoryFromDate)}{" "}
                till {formatTimestamp(freezeHistoryEndDate)}{" "}
              </p>
            )}
            <div className="overflow-x-auto scrollbar-thin">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-nowrap">Bill ID</TableHead>
                    <TableHead className="text-nowrap">From date</TableHead>
                    <TableHead className="text-nowrap">To date</TableHead>
                    <TableHead className="text-nowrap">Days allotted</TableHead>
                    <TableHead className="text-nowrap">Package name</TableHead>
                    <TableHead className="text-nowrap">Exp.</TableHead>
                    <TableHead className="text-nowrap">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {freezeData.map((item, index) => (
                    <TableRow key={item.billId}>
                      <TableCell>{item.billId}</TableCell>
                      <TableCell>
                        <Popover modal={true}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !item.fromDate && "text-muted-foreground"
                              )}
                            >
                              {item.fromDate ? (
                                format(new Date(item.fromDate), "dd-MM-yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 bg-white bottom-0 rounded-md my-2"
                            align="center"
                            side="bottom"
                          >
                            <Calendar
                              mode="single"
                              selected={new Date(item.fromDate)}
                              onSelect={(value) =>
                                handleDateChange(index, "fromDate", value)
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell>
                        <Popover modal={true}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !item.toDate && "text-muted-foreground"
                              )}
                            >
                              {item.toDate ? (
                                format(new Date(item.toDate), "dd-MM-yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 bg-white bottom-0 rounded-md my-2"
                            align="center"
                            side="bottom"
                          >
                            <Calendar
                              mode="single"
                              selected={new Date(item.toDate)}
                              onSelect={(value) =>
                                handleDateChange(index, "toDate", value)
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell>{item.daysAllotted}</TableCell>
                      <TableCell>{item.packageName}</TableCell>
                      <TableCell>
                        {format(new Date(item.expDate), "dd-MM-yyyy")}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleFreeze(index)}
                          variant="default"
                          size="sm"
                        >
                          Edit Freeze
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default FreezeMembership;
