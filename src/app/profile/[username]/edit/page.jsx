"use client";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { Poppins, Roboto_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PoppinsJudul = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
  preload: true,
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  preload: true,
});

export default function Edit() {
  const { data: session, status } = useSession();
  const [section, setSection] = useState("edit profile");
  const [userData, setUserData] = useState(null);
  const [userDataBefore, setUserDataBefore] = useState(null);
  const router = useRouter();

  const getData = async () => {
    try {
      const user = await axios.post("/api/user/byEmail", {
        email: session.user?.email,
      });
      setUserData(user.data.user);
      setUserDataBefore(user.data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/edit", {
        ...userData,
        id: userData._id,
      });
      console.log(res.data.currentUsername);
      console.log(userData.password);
      const login = await signIn("credentials", {
        username: res.data.currentUsername,
        password: userData.password,
        redirect: false,
      });

      if (login.ok === true) {
        router.replace(`/profile/${res.data.currentUsername}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (status === "authenticated") getData();
  }, [status]);

  return (
    <div className="py-[50px] flex gap-[50px] w-[80%] mx-auto">
      {/* sidebar */}
      <div className="w-1/4 text-white border-r-[1px] border-white">
        <h1 className={`${PoppinsJudul.className} text-[2rem]`}>Pengaturan</h1>
        <ul className="py-[30px] list-disc flex flex-col gap-[20px]">
          <li>
            <button
              className={`${robotoMono.className} text-[.8rem] ${
                section === "edit profile" ? "text-blue-400" : ""
              }`}
              onClick={() => setSection("edit profile")}
            >
              edit profile
            </button>
          </li>
          <li>
            <button
              className={`${robotoMono.className} text-[.8rem]`}
              onClick={() => setSection("lorem ipsum")}
            >
              lorem ipsum
            </button>
          </li>
        </ul>
      </div>

      {/* form edit profile */}
      <form className="w-3/4 text-white px-[30px]">
        {userData === null ? (
          <div className="text-white">loading ...</div>
        ) : (
          <div>
            <h1 className={`${PoppinsJudul.className} text-[1.5rem]`}>
              edit profile
            </h1>

            <div className="flex flex-col gap-[30px] py-[30px]">
              <div className="flex gap-[20px] items-center">
                <div className="w-1/4 flex justify-end">
                  <img
                    src={userData.pp}
                    alt="pp"
                    className="w-[50px] rounded-full"
                  />
                </div>
                <input type="file" id="editpp" className="hidden" />
                <label
                  htmlFor="editpp"
                  className={`${robotoMono.className} text-[.9rem] h-fit w-3/4 px-[10px] cursor-pointer text-blue-400`}
                >
                  ubah foto
                </label>
              </div>

              <div className="flex gap-[20px] items-start">
                <label
                  htmlFor="username"
                  className={`${robotoMono.className} text-[.8rem] w-1/4 text-right`}
                >
                  username
                </label>
                <input
                  className={`form-input border-slate-500 focus:outline-none focus:border-slate-800 focus:ring-0 rounded-[3px] border-opacity-50 py-[5px] text-white text-[.8rem] bg-transparent w-1/2`}
                  type="text"
                  name="username"
                  placeholder={userData.username}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-[20px] items-start">
                <label
                  htmlFor="deskripsi"
                  className={`${robotoMono.className} text-[.8rem] w-1/4 text-right`}
                >
                  deskripsi
                </label>
                <textarea
                  className={`form-input border-slate-500 focus:outline-none focus:border-slate-800 focus:ring-0 rounded-[3px] border-opacity-50 py-[5px] text-white text-[.8rem] bg-transparent w-1/2`}
                  type="text"
                  name="deskripsi"
                  placeholder={userData.deskripsi}
                  onChange={(e) =>
                    setUserData({ ...userData, deskripsi: e.target.value })
                  }
                />
              </div>

              <div>
                <button
                  className={`bg-blue-400 text-white px-[15px] py-[7px] rounded-[5px] text-[.8rem] ml-auto block ${robotoMono.className}`}
                  onClick={handleEditSubmit}
                >
                  kirim
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
