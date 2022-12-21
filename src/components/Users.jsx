import React from "react";

const Users = ({ users, isLoading }) => {
  if (isLoading) {
    return;
  }

  if (users?.length === 0) {
    return (
      <h1 className="text-3xl text-gray-900 font-bold uppercase mt-20">
        Don't have any user yet
      </h1>
    );
  }

  return (
    <div className="mt-20">
      <div className="overflow-x-auto border">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                No.
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Sector
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user.sector}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
