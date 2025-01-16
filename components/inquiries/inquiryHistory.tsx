import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface InquiryHistoryProps {
  selectedInquiry: Record<string, boolean>;
}

const InquiryHistory: React.FC<InquiryHistoryProps> = ({ selectedInquiry }) => {
  return (
    <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Inquiry Update History</CardTitle>
      </CardHeader>
      <CardContent>Please Select an Inquiry to check history</CardContent>
    </Card>
  );
};

export default InquiryHistory;
