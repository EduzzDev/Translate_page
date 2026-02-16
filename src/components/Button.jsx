function Button({ children, nome, active, toggle }) {
  return (
    <button
      onClick={() => toggle(nome)}
      className={`w-18 relative mt-8 ml-2 font-semibold  focus:rounded-2xl hover:rounded-2xl p-2 hover:bg-[#394150] ${
        active ? "bg-[#394150] text-[#D2D5DA] rounded-2xl " : "text-[#D2D5DA] "
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
