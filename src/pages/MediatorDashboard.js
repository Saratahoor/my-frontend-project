import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar } from "../components/ui/avatar";
import { 
    DropdownMenu, 
    DropdownMenuItem, 
    DropdownMenuContent, 
    DropdownMenuTrigger 
} from "../components/ui/dropdown-menu";
import { FaBalanceScale, FaCheckCircle, FaClock, FaHourglassHalf } from "react-icons/fa";

const MediatorDashboard = () => {
    const [cases, setCases] = useState([
        { id: 1, title: "Case 1", status: "Resolved" },
        { id: 2, title: "Case 2", status: "Pending" },
        { id: 3, title: "Case 3", status: "In Progress" },
    ]);

    const stats = {
        totalCases: cases.length,
        resolved: cases.filter((c) => c.status === "Resolved").length,
        pending: cases.filter((c) => c.status === "Pending").length,
        inProgress: cases.filter((c) => c.status === "In Progress").length,
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-600 text-white p-5 flex flex-col items-center shadow-lg rounded-r-2xl">
                <h1 className="text-2xl font-bold">NyayPath</h1>
                <p className="text-sm text-gray-300">Mediation Platform</p>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800">Mediator Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full">M</Avatar>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="text-sm text-blue-600 border border-blue-400 px-3 py-2 rounded-md shadow-md hover:bg-blue-100">Settings</DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-lg p-2 border border-gray-200 mt-2">
                                <DropdownMenuItem className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">Edit Profile</DropdownMenuItem>
                                <DropdownMenuItem className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 mt-12">
                    <Card className="shadow-2xl border-b-4 border-gray-500 transform hover:translate-y-1 transition-transform duration-300">
                        <CardContent>
                            <FaBalanceScale className="text-blue-500 text-4xl mx-auto mb-2" />
                            <h3 className="text-lg font-bold">Total Cases</h3>
                            <p className="text-2xl font-semibold text-blue-600">{stats.totalCases}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-md p-6 rounded-lg text-center border-l-4 border-green-500">
                        <CardContent>
                            <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-2" />
                            <h3 className="text-lg font-bold">Resolved</h3>
                            <p className="text-2xl font-semibold text-green-600">{stats.resolved}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-md p-6 rounded-lg text-center border-l-4 border-red-500">
                        <CardContent>
                            <FaClock className="text-red-500 text-4xl mx-auto mb-2" />
                            <h3 className="text-lg font-bold">Pending</h3>
                            <p className="text-2xl font-semibold text-red-600">{stats.pending}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-md p-6 rounded-lg text-center border-l-4 border-yellow-500">
                        <CardContent>
                            <FaHourglassHalf className="text-yellow-500 text-4xl mx-auto mb-2" />
                            <h3 className="text-lg font-bold">In Progress</h3>
                            <p className="text-2xl font-semibold text-yellow-600">{stats.inProgress}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Cases Section */}
                <h3 className="text-2xl font-semibold text-gray-700 mb-6">My Cases</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cases.map((caseItem) => (
                        <Card key={caseItem.id} className="bg-white shadow-md p-6 rounded-lg border border-gray-200">
                            <CardContent>
                                <h4 className="text-lg font-semibold text-gray-800">{caseItem.title}</h4>
                                <p className={`mt-2 text-sm font-medium ${caseItem.status === "Resolved" ? "text-green-500" : caseItem.status === "Pending" ? "text-red-500" : "text-yellow-500"}`}>{caseItem.status}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MediatorDashboard;
