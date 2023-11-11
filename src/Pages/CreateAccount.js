import "./CreateAccount.css";
import Navbar from "../components/Navbar";
import bg from "../image/image 6.png";
export default function CreateAccount() {
  return (
    
    <section className="bg-stone-50 flex flex-col items-stretch text" >
      <img class="w-full h-full bg-scroll left-0 top-0 absolute blur-[5px]" alt="bg" src={bg}/>
      <Navbar />
      <div className="self-center flex w-[547px] max-w-full flex-col mt-24 mb-32 px-5 my-10">
        <h2 className="text-teal-500 text-center text-2xl font-bold font-['Inter'] drop-shadow-2xl self-stretch ml-0 mr-0 max-w-full">
          Create an account
        </h2>
        <div className="self-center flex w-[195] max-w-full items-stretch gap-2.5 mt-1.5">
          <p className="text-black text-center text-xs font-medium">
            Already have an account?
          </p>
          <a
            href="#"
            className="text-black text-center text-xs font-medium underline"
          >
            Sign In
          </a>
        </div>
        <label
          htmlFor="username"
          className="text-black text-base font-medium max-w-[572px] ml-3 mt-6 self-start "
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="rounded bg-[#E3E3E3] self-stretch flex shrink-0 h-[30px] flex-col  mt-6 max-w-full"
        />
        <label
          htmlFor="password"
          className="text-black text-base font-medium max-w-[572px] ml-3 mt-7 self-start ml-2.5"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="rounded bg-[#E3E3E3] self-stretch flex shrink-0 h-[30px] flex-col  mt-6 max-w-full"
        />
        <label
          htmlFor="confirm-password"
          className="text-black text-base font-medium max-w-[572px] ml-3 mt-10 self-start ml-2.5"
        >
          Confirmed Password
        </label>
        <input
          type=""
          id="confirm-password"
          className="rounded bg-[#E3E3E3] self-stretch flex shrink-0 h-[30px] flex-col  mt-3 max-w-full"
        />
        <label
          htmlFor="phone-number"
          className="text-black text-base font-medium max-w-[572px] ml-3 mt-7 self-start ml-2.5"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone-number"
          className="rounded bg-[#E3E3E3] self-stretch flex shrink-0 h-[30px] flex-col  mt-6 max-w-full"
        />
        <button
          type="submit"
          className="justify-center text-black text-center text-base font-medium  rounded bg-[#C2EEF4] self-stretch items-center  mt-6 px-5 py-4 max-w-full"
        >
          Continue
        </button>
      </div>
    </section>
  );
}
