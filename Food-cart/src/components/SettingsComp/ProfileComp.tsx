import { motion } from "framer-motion";
import { Edit } from "lucide-react";

interface Profile {
  isEditing: boolean;
  updateUserProfile: () => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: {
    name?: string;
    phone?: string;
    address?: string;
    currentPassword?: string;
    newPassword?: string;
    [key: string]: any;
  };
  userData: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    [key: string]: any;
  };
  setIsEditing: (editing: boolean) => void;
}

const ProfileComp = ({
  isEditing,
  updateUserProfile,
  handleInputChange,
  formData,
  userData,
  setIsEditing,
}: Profile) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Personal Information
        </h2>
        {!isEditing ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsEditing(true)}
            className="flex items-center text-orange-500 hover:text-orange-600"
          >
            <Edit className="mr-1" size={18} /> Edit
          </motion.button>
        ) : (
          <div className="flex space-x-3">
            <motion.button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={updateUserProfile}
              className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Save
            </motion.button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <div className="w-24 text-gray-500">Name</div>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData?.name || ""}
              onChange={handleInputChange}
              className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none py-1"
            />
          ) : (
            <div className="flex-1 font-medium">{userData?.name}</div>
          )}
        </div>

        <div className="flex items-center">
          <div className="w-24 text-gray-500">Email</div>
          <div className="flex-1 font-medium text-gray-600">
            {userData?.email}
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-24 text-gray-500">Phone</div>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={formData?.phone}
              onChange={handleInputChange}
              className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none py-1"
            />
          ) : (
            <div className="flex-1 font-medium">{userData?.phone}</div>
          )}
        </div>

        <div className="flex items-start">
          <div className="w-24 text-gray-500">Address</div>
          {isEditing ? (
            <textarea
              name="address"
              value={formData?.address}
              onChange={handleInputChange}
              className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none py-1 resize-none"
              rows={2}
            />
          ) : (
            <div className="flex-1 font-medium">{userData?.address}</div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Change Password
          </h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-36 text-gray-500">Current Password</div>
              <input
                type="password"
                name="currentPassword"
                value={formData?.currentPassword}
                onChange={handleInputChange}
                className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none py-1"
              />
            </div>

            <div className="flex items-center">
              <div className="w-36 text-gray-500">New Password</div>
              <input
                type="password"
                name="newPassword"
                value={formData?.newPassword}
                onChange={handleInputChange}
                className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none py-1"
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProfileComp;
