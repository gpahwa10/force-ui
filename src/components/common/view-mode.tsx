interface ViewModeProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export default function ViewMode({ viewMode, setViewMode }: ViewModeProps) {
  return (
    <div className="border-border-secondary flex flex-row items-center rounded-[8px] border p-1">
      <button
        onClick={() => setViewMode("grid")}
        className={`cursor-pointer rounded-[4px] p-[4.5px] transition-colors ${
          viewMode === "grid" ? "bg-elevation-button" : "bg-transparent"
        }`}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 3.125C2.5 2.95924 2.56585 2.80027 2.68306 2.68306C2.80027 2.56585 2.95924 2.5 3.125 2.5H5.625C5.79076 2.5 5.94973 2.56585 6.06694 2.68306C6.18415 2.80027 6.25 2.95924 6.25 3.125V5.625C6.25 5.79076 6.18415 5.94973 6.06694 6.06694C5.94973 6.18415 5.79076 6.25 5.625 6.25H3.125C2.95924 6.25 2.80027 6.18415 2.68306 6.06694C2.56585 5.94973 2.5 5.79076 2.5 5.625V3.125Z"
            stroke="#7E7E8C"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.75 3.125C8.75 2.95924 8.81585 2.80027 8.93306 2.68306C9.05027 2.56585 9.20924 2.5 9.375 2.5H11.875C12.0408 2.5 12.1997 2.56585 12.3169 2.68306C12.4342 2.80027 12.5 2.95924 12.5 3.125V5.625C12.5 5.79076 12.4342 5.94973 12.3169 6.06694C12.1997 6.18415 12.0408 6.25 11.875 6.25H9.375C9.20924 6.25 9.05027 6.18415 8.93306 6.06694C8.81585 5.94973 8.75 5.79076 8.75 5.625V3.125Z"
            stroke="#7E7E8C"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.5 9.375C2.5 9.20924 2.56585 9.05027 2.68306 8.93306C2.80027 8.81585 2.95924 8.75 3.125 8.75H5.625C5.79076 8.75 5.94973 8.81585 6.06694 8.93306C6.18415 9.05027 6.25 9.20924 6.25 9.375V11.875C6.25 12.0408 6.18415 12.1997 6.06694 12.3169C5.94973 12.4342 5.79076 12.5 5.625 12.5H3.125C2.95924 12.5 2.80027 12.4342 2.68306 12.3169C2.56585 12.1997 2.5 12.0408 2.5 11.875V9.375Z"
            stroke="#7E7E8C"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.75 9.375C8.75 9.20924 8.81585 9.05027 8.93306 8.93306C9.05027 8.81585 9.20924 8.75 9.375 8.75H11.875C12.0408 8.75 12.1997 8.81585 12.3169 8.93306C12.4342 9.05027 12.5 9.20924 12.5 9.375V11.875C12.5 12.0408 12.4342 12.1997 12.3169 12.3169C12.1997 12.4342 12.0408 12.5 11.875 12.5H9.375C9.20924 12.5 9.05027 12.4342 8.93306 12.3169C8.81585 12.1997 8.75 12.0408 8.75 11.875V9.375Z"
            stroke="#7E7E8C"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`cursor-pointer rounded-[4px] p-[4.5px] transition-colors ${
          viewMode === "list" ? "bg-elevation-button" : "bg-transparent"
        }`}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 3.75C2.5 3.41848 2.6317 3.10054 2.86612 2.86612C3.10054 2.6317 3.41848 2.5 3.75 2.5H11.25C11.5815 2.5 11.8995 2.6317 12.1339 2.86612C12.3683 3.10054 12.5 3.41848 12.5 3.75V5C12.5 5.33152 12.3683 5.64946 12.1339 5.88388C11.8995 6.1183 11.5815 6.25 11.25 6.25H3.75C3.41848 6.25 3.10054 6.1183 2.86612 5.88388C2.6317 5.64946 2.5 5.33152 2.5 5V3.75Z"
            stroke="#7E7E8C"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.5 10C2.5 9.66848 2.6317 9.35054 2.86612 9.11612C3.10054 8.8817 3.41848 8.75 3.75 8.75H11.25C11.5815 8.75 11.8995 8.8817 12.1339 9.11612C12.3683 9.35054 12.5 9.66848 12.5 10V11.25C12.5 11.5815 12.3683 11.8995 12.1339 12.1339C11.8995 12.3683 11.5815 12.5 11.25 12.5H3.75C3.41848 12.5 3.10054 12.3683 2.86612 12.1339C2.6317 11.8995 2.5 11.5815 2.5 11.25V10Z"
            stroke="#7E7E8C"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
