

// import { useAuth } from "@/context/AuthContext";
import Table from "@/app/components/Table";
import ProtectedRoute from "@/utils/ProtectedRoute";
import { Metadata } from "next";
// import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Create & Customize Your Dynamic QR code for FREE. Generate simple & advanced QR codes. Easy, customizable & trackable.',
}

export default function Dashboard () {
  const columns = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Destination URL",
      accessor: "destinationUrl",
    },
    {
      header: "Alias",
      accessor: "alias",
    },
    {
      header: "Created At",
      accessor: "createdAt",
    },
    {
      header: "Updated At",
      accessor: "updatedAt",
    },
    {
      header: "Actions",
      accessor: "actions",
    }
    
  ]
//   const { logOut } = useAuth();
//   const router = useRouter();
const createData = (length: number) => {
  return Array.from({ length }, (_, index) => ({
    id: index,
    name: `Name ${index}`,
    age: Math.floor(Math.random() * 100),
    email: `example@hmaif`.replace("hmaif", `example.com`),
  }));
};
  return (
    <ProtectedRoute>
      <Table data={createData(2300)} columns={columns} />
    </ProtectedRoute>
  );
};

