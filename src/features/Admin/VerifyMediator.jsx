import toast from "react-hot-toast";
import {
  apiGetUnverifiedMediators,
  apiVerifyMediator,
} from "../../utils/apiAdmin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PageLoader from "../../components/PageLoader";
import Content from "../../components/ui/Content";

// Util: Generate profile picture
// const getProfilePic = (gender, email) => {
//   if (gender === "Male") {
//     return "https://randomuser.me/api/portraits/men/32.jpg";
//   } else if (gender === "Female") {
//     return "https://randomuser.me/api/portraits/women/44.jpg";
//   }
//   return `https://i.pravatar.cc/150?u=${email}`;
// };

// Fetch unverified mediators
export function getUnverifiedMediators() {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["unverified-mediators"],
    queryFn: apiGetUnverifiedMediators,
  });
  return { data, isLoading, isError, refetch, isFetching };
}

// Hook to verify mediator
function useVerifyMediator() {
  const query = useQueryClient();
  const { mutate: verifyMediator, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiVerifyMediator(data),
    onSuccess: (data) => {
      toast.success(data.message);
      query.invalidateQueries(["unverified-mediators"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { verifyMediator, isLoading };
}

// Main component
function VerifyMediator() {
  const { data, isLoading, isError } = getUnverifiedMediators();
  const { verifyMediator, isLoading: verifying } = useVerifyMediator();
  const mediators = data?.data;

  const handleClick = (data) => {
    verifyMediator(data);
  };

  if (isLoading || verifying) return <PageLoader />;
  if (isError || !mediators.length)
    return <h1 className="text-center mt-8">No unverified mediators found.</h1>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {mediators.map((mediator) => (
        <div
          key={mediator._id}
          className="bg-white shadow-md rounded-lg p-4 w-full"
        >
          <div className="flex flex-col items-center text-center mb-4">
            {/* <img
              src={getProfilePic(mediator.gender, mediator.email)}
              alt={mediator.full_name}
              className="w-20 h-20 rounded-full object-cover shadow-sm mb-2"
            /> */}
            <h2 className="text-lg font-semibold text-gray-800">
              <Content>{mediator.full_name}</Content>
            </h2>
            <p className="text-sm text-gray-600">
              <Content>{mediator.gender}</Content>, <Content>Age</Content>{" "}
              {new Date().getFullYear() - new Date(mediator.DOB).getFullYear()}
            </p>
          </div>

          <div className="text-sm text-gray-700 space-y-1">
            <p>
              📍 <Content>{mediator.address.city}</Content>,{" "}
              <Content>{mediator.address.state}</Content>
            </p>
            <p>📧 {mediator.email}</p>
            <p>📞 {mediator.number}</p>
            <p>
              🗣️{" "}
              {mediator.languages_spoken.map((tag, index) => (
                <span key={index}>
                  <Content>{tag}</Content>
                  {index < mediator.languages_spoken.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p>
              ⚖️{" "}
              {mediator.specializations.map((tag, index) => (
                <span key={index}>
                  <Content>{tag}</Content>
                  {index < mediator.specializations.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p>
              🎓{" "}
              {mediator.education_qualification.map((tag, index) => (
                <span key={index}>
                  <Content>{tag}</Content>
                  {index < mediator.education_qualification.length - 1
                    ? ", "
                    : ""}
                </span>
              ))}
            </p>
            <p>
              💼 {mediator.years_of_experience} <Content>yrs</Content> | ₹
              {mediator.price}
            </p>
            <p>
              🎯 <Content>{mediator.level}</Content>
              <Content>{mediator.mode}</Content>
            </p>
            <p>
              ✔️{" "}
              <span className="text-yellow-600">
                <Content>{mediator.verification_status}</Content>
              </span>
            </p>
          </div>

          <div className="mt-4 flex justify-around">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
              onClick={() =>
                handleClick({ status: "Verified", mediator_id: mediator._id })
              }
            >
              <Content>Accept</Content>
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              onClick={() =>
                handleClick({ status: "Rejected", mediator_id: mediator._id })
              }
            >
              <Content>Reject</Content>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VerifyMediator;
