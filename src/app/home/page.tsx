import Image from "next/image";
import { IoLogoLinkedin } from "react-icons/io";

function Login() {
    return (
        <div className="w-full h-full">
            <div className="flex justify-between py-3 px-4 items-center">
                <div className="relative w-28 h-6">
                    <Image
                        src="https://rb.gy/vtbzlp"
                        layout="fill"
                        objectFit="contain"
                        alt="home-icon"
                    />
                </div>
                <button className="py-3 px-6 rounded-full border-[#0a66c2] border-[1px] text-[#0a66c2]">
                    Sign in
                </button>
            </div>
            <main>
                <section className="px-4 pt-6 flex flex-col items-center">
                    <h3 className="text-3xl text-center text-[#526a6e]">
                        Welcome to your expert community
                    </h3>
                    <button className="py-2 px-6 my-4 text-black border-black border-[1px] w-full rounded-full text-lg font-medium">
                        Đăng nhập bằng email
                    </button>
                    <p className="text-center">
                        By clicking Continue to join or log in, you agree to
                        LinkedIn's User Agreement, Privacy Policy, and Cookie
                        Policy.
                    </p>
                </section>
            </main>
        </div>
    );
}

export default Login;
