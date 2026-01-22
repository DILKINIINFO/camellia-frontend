// --- START OF FILE SuperAdminDashboard.tsx ---

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import {
  Package,
  Eye,
  Key,
  AreaChart,
  UserPlus,
  Mail,
  CheckCircle,
} from 'lucide-react'; // Added icons

// Mock data for plantations (you might have a central mock data file)
interface Plantation {
  id: string;
  name: string;
  owner: string;
  businessReg: string;
  username: string; // For plantation admin
}

// Mock initial plantations
const MOCK_PLANTATIONS: Plantation[] = [
  {
    id: '1',
    name: 'Pedro Tea Estate',
    owner: 'Pedro Es',
    businessReg: 'BRN-001-2020',
    username: 'Ped_1 Es',
  },
  {
    id: '2',
    name: 'Pedro Tea Estate',
    owner: 'Pedro Es',
    businessReg: 'BRN-001-2021',
    username: 'Ped_2 Es',
  },
];

// Mock data for contact requests
interface ContactRequest {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'resolved';
}

const MOCK_CONTACT_REQUESTS: ContactRequest[] = [
  {
    id: 'req1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    subject: 'Inquiry about bookings',
    message: 'I have a question about booking an experience at your plantations.',
    status: 'pending',
  },
  {
    id: 'req2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    subject: 'Partnership opportunity',
    message: 'We are interested in collaborating with Camellia Tea Tourism.',
    status: 'resolved',
  },
];

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'plantations' | 'registerPlantation' | 'contactRequests'
  >('plantations');
  const [plantations, setPlantations] =
    useState<Plantation[]>(MOCK_PLANTATIONS);
  const [contactRequests, setContactRequests] =
    useState<ContactRequest[]>(MOCK_CONTACT_REQUESTS);

  // State for Register Plantation form
  const [newPlantation, setNewPlantation] = useState({
    name: '',
    owner: '',
    businessReg: '',
    address: '',
    telephone: '',
    email: '',
  });
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});
  const [regSuccess, setRegSuccess] = useState(false);

  useEffect(() => {
    // Redirect if not a super admin
    if (!user || user.role !== 'superadmin') {
      alert("You don't have permission to access the Super Admin dashboard.");
      navigate('/'); // Redirect to home or sign-in
    }
  }, [user, navigate]);

  if (!user || user.role !== 'superadmin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Access Denied or Redirecting...</p>
      </div>
    );
  }

  // --- Plantation Management Functions ---
  const handleGenerateCredentials = (plantationId: string) => {
    const plantation = plantations.find((p) => p.id === plantationId);
    if (plantation) {
      const generatedUsername = `admin_${plantation.id}`;
      const generatedPassword = Math.random().toString(36).slice(-8); // Simple random password
      alert(
        `Credentials for ${plantation.name}:\nUsername: ${generatedUsername}\nPassword: ${generatedPassword}\n\n(In a real app, these would be securely emailed or displayed once)`
      );
      // In a real application, you would store these credentials in a secure database
      // and associate them with the plantation.
    }
  };

  // --- Register Plantation Form Handlers ---
  const handleRegChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPlantation((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (regErrors[name]) {
      setRegErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateRegForm = () => {
    const newErrors: Record<string, string> = {};
    if (!newPlantation.name.trim())
      newErrors.name = 'Plantation Name is required';
    if (!newPlantation.owner.trim()) newErrors.owner = 'Owner Name is required';
    if (!newPlantation.businessReg.trim())
      newErrors.businessReg = 'Business Registration Number is required';
    if (!newPlantation.address.trim()) newErrors.address = 'Address is required';
    if (!newPlantation.telephone.trim())
      newErrors.telephone = 'Telephone Number is required';
    else if (!/^[\d\s\-\+\(\)]+$/.test(newPlantation.telephone)) {
      newErrors.telephone = 'Please enter a valid telephone number';
    }
    if (!newPlantation.email.trim()) newErrors.email = 'Email Address is required';
    else if (!/\S+@\S+\.\S+/.test(newPlantation.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    return newErrors;
  };

  const handleRegisterPlantation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateRegForm();
    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      return;
    }

    const newId = (plantations.length + 1).toString();
    const newPlantationEntry: Plantation = {
      id: newId,
      name: newPlantation.name,
      owner: newPlantation.owner,
      businessReg: newPlantation.businessReg,
      username: `Ped_${newId} Es`, // Mock username for now
    };

    setPlantations((prev) => [...prev, newPlantationEntry]);
    setRegSuccess(true);
    setNewPlantation({
      name: '',
      owner: '',
      businessReg: '',
      address: '',
      telephone: '',
      email: '',
    });
    setRegErrors({});

    setTimeout(() => setRegSuccess(false), 3000);
  };

  // --- Contact Request Management Functions ---
  const handleResolveRequest = (id: string) => {
    setContactRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'resolved' } : req))
    );
    alert('Contact request marked as resolved.');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1B4332]">
      <Navbar />
      <main className="py-16 px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-bold font-serif text-center mb-4">
              Super Admin Dashboard
            </h1>
            <p className="text-gray-600 text-center text-lg">
              Manage the entire Camellia platform.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-gray-200 pb-4">
            <button
              onClick={() => setActiveTab('plantations')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'plantations'
                  ? 'bg-[#2D6A4F] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <AreaChart size={20} /> Plantations
            </button>
            <button
              onClick={() => setActiveTab('registerPlantation')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'registerPlantation'
                  ? 'bg-[#2D6A4F] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <UserPlus size={20} /> Register Plantation
            </button>
            <button
              onClick={() => setActiveTab('contactRequests')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'contactRequests'
                  ? 'bg-[#2D6A4F] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Mail size={20} /> Contact Requests
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-inner">
            {activeTab === 'plantations' && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Total Plantations <span className="text-[#2D6A4F]">({plantations.length})</span>
                </h2>

                {/* Placeholder for chart */}
                <div className="bg-white rounded-lg p-6 mb-8 shadow">
                  <p className="text-gray-500 text-center">
                    (Placeholder for plantation growth chart)
                  </p>
                  {/*
                  You can integrate a charting library here, e.g., Recharts or Chart.js
                  <div className="h-64 flex items-center justify-center">
                    <AreaChart width={600} height={250} data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="plantations" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </div>
                  */}
                    <div className="h-64 border border-gray-300 rounded-lg flex items-end justify-around p-4 text-sm text-gray-600">
                    <div className="relative h-full w-1/5 flex flex-col justify-end items-center">
                      <div className="bg-gray-300 w-full h-[10%] rounded-t-md"></div>
                      <span className="mt-1">2024</span>
                    </div>
                    <div className="relative h-full w-1/5 flex flex-col justify-end items-center">
                      <div className="bg-[#2D6A4F] w-full h-[40%] rounded-t-md"></div> {/* Example height */}
                      <span className="mt-1">2025</span>
                    </div>
                    <div className="relative h-full w-1/5 flex flex-col justify-end items-center">
                      <div className="bg-gray-300 w-full h-[15%] rounded-t-md"></div>
                      <span className="mt-1">2026</span>
                    </div>
                    <div className="relative h-full w-1/5 flex flex-col justify-end items-center">
                      <div className="bg-gray-300 w-full h-[5%] rounded-t-md"></div>
                      <span className="mt-1">2027</span>
                    </div>
                  </div>
                </div>


                <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Plantation Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Owner
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Business Reg
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Username
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {plantations.map((plantation) => (
                        <tr key={plantation.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{plantation.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {plantation.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {plantation.owner}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {plantation.businessReg}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {plantation.username}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  alert(`Viewing details for ${plantation.name}`)
                                }
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              >
                                <Eye className="h-4 w-4 mr-1" /> View
                              </button>
                              <button
                                onClick={() =>
                                  handleGenerateCredentials(plantation.id)
                                }
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              >
                                <Key className="h-4 w-4 mr-1" /> Credentials
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'registerPlantation' && (
              <div className="max-w-xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Register New Plantation
                </h2>
                {regSuccess && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <p className="font-semibold">
                      Plantation registered successfully!
                    </p>
                  </div>
                )}
                <form onSubmit={handleRegisterPlantation} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold mb-2"
                    >
                      Plantation Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newPlantation.name}
                      onChange={handleRegChange}
                      placeholder="Pedro Tea Estate"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                        regErrors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500'
                      }`}
                    />
                    {regErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {regErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="owner"
                      className="block text-sm font-semibold mb-2"
                    >
                      Owner Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="owner"
                      name="owner"
                      value={newPlantation.owner}
                      onChange={handleRegChange}
                      placeholder="Rajesh Perera"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                        regErrors.owner
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500'
                      }`}
                    />
                    {regErrors.owner && (
                      <p className="text-red-500 text-sm mt-1">
                        {regErrors.owner}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="businessReg"
                      className="block text-sm font-semibold mb-2"
                    >
                      Business Registration Number{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="businessReg"
                      name="businessReg"
                      value={newPlantation.businessReg}
                      onChange={handleRegChange}
                      placeholder="BRN-001-2020"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                        regErrors.businessReg
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500'
                      }`}
                    />
                    {regErrors.businessReg && (
                      <p className="text-red-500 text-sm mt-1">
                        {regErrors.businessReg}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-semibold mb-2"
                    >
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={newPlantation.address}
                      onChange={handleRegChange}
                      placeholder="Pedro Tea Estate,Nuwara Eliya"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                        regErrors.address
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500'
                      }`}
                    />
                    {regErrors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {regErrors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="telephone"
                        className="block text-sm font-semibold mb-2"
                      >
                        Telephone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={newPlantation.telephone}
                        onChange={handleRegChange}
                        placeholder="0342256789"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                          regErrors.telephone
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-green-500'
                        }`}
                      />
                      {regErrors.telephone && (
                        <p className="text-red-500 text-sm mt-1">
                          {regErrors.telephone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold mb-2"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={newPlantation.email}
                        onChange={handleRegChange}
                        placeholder="raj@gmail.com"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                          regErrors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-green-500'
                        }`}
                      />
                      {regErrors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {regErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 mt-6"
                  >
                    Register Plantation
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'contactRequests' && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Contact Requests ({contactRequests.filter(req => req.status === 'pending').length} pending)
                </h2>
                <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Subject
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Message
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contactRequests.map((request) => (
                        <tr key={request.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {request.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {request.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {request.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {request.subject}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 max-w-xs overflow-hidden text-ellipsis">
                            {request.message}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                request.status === 'resolved'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {request.status === 'pending' && (
                              <button
                                onClick={() => handleResolveRequest(request.id)}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              >
                                Resolve
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

