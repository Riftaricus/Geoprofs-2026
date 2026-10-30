import { PieChart } from '@mui/x-charts/PieChart';
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { NavLink } from 'react-router';
import { NotificationManager } from '../../components/dasboard/NotificationManager';
import { PopUp } from '../../components/dasboard/Popup';
import {
  BarChart3,
  CalendarDays,
  FolderKanban,
  Users,
} from "lucide-react";
import { useState } from 'react';

// template manager, ga ik later vervangen met de models die zijn gemaakt
// en dan ook de backend link implementeren
const mockMan = {
  fname: "John",
  lname: "Doe",
  team_presence: [
    { label: 'Absent', value: 12, color: '#ff6467' },
    { label: 'Aanwezig', value: 18, color: '#05df72' }
  ],
  messages: [
    {
      reason_sm: "tandarts",
      subject: "Verlofaanvraag Henk",
    },
    {
      reason_sm: "tandarts",
      subject: "Verlofaanvraag Henk",
    },
    {
      reason_sm: "tandarts",
      subject: "Verlofaanvraag Henk",
    },
  ]
}

//deze zijn tijdelijk en kunnen later specefieker bijv /planning/dagen
// of naar aanvragen goedkeuren dat soort dingen
const managerNavigation = [
  {
    label: "Werknemers",
    path: "/werknemers",
    icon: Users,
  },
  {
    label: "Projecten",
    path: "/projecten",
    icon: FolderKanban,
  },
  {
    label: "Planning",
    path: "/planning",
    icon: CalendarDays,
  },
  {
    label: "Rapporten",
    path: "/rapporten",
    icon: BarChart3,
  },
];

export function ManagerPage() {
  const [popUp, setPopUp] = useState(false);

  function quickSick(response: Boolean) {
    if (response) {
      //hier komt de implementatie van ziek melden
      alert("ziekgemeld");
    }

    setPopUp(false);
  }

  return (
    <DashboardLayout role="manager">
      <div className="h-full flex flex-col justify-around items-center w-full rounded-xl border border-slate-200 bg-[#F3F4F6] p-6 shadow-sm">
        {
          popUp &&
          <PopUp closerCallback={setPopUp}>
            <div className='w-9/10 h-8/10 flex justify-center items-center'>
              <div className='w-full h-full flex flex-col items-center p-2'>
                <p className='text-lg text-center'>Weet je het zeker dat je jezelf wilt ziekmelden?</p>

                <div className='h-1/10 w-full flex justify-around items-center p-2'>
                  <button onClick={() => quickSick(true)} className='bg-[#05df72] hover:bg-[#05ba60] hover:text-white p-1 rounded-full w-20'>Ja</button>
                  <button onClick={() => quickSick(false)} className='bg-[#ff6467] hover:bg-[#f73e41] hover:text-white p-1 rounded-full w-20'>Nee</button>
                </div>
              </div>
            </div>
          </PopUp>
        }


        <div className="w-full h-fit flex justify-center">
          <h1 className="text-2xl h-fit font-semibold text-[#0E3A5B]">
            Welkom op je dashboard {mockMan.fname} {mockMan.lname}.
          </h1>
        </div>

        <div className="w-8/10 h-2/5 flex justify-center gap-x-10">
          <div className="w-1/3 h-full shadow-md rounded-2xl bg-[#eae9e9] border border-slate-200">
            <div className="w-full h-fit p-2 flex justify-center items-center text-2xl font-bold">
              <p>Team aanwezigheid</p>
            </div>

            <div className="h-7/10 w-full flex justify-center items-center">
              <PieChart
                series={[{ innerRadius: "45%", outerRadius: "90%", data: mockMan.team_presence }]}
                className="h-full w-full" hideLegend={true}
              />
            </div>

            <div className='w-full h-1/10 flex justify-center items-center'>
              <button onClick={() => setPopUp(true)} className='bg-[#ff6467] hover:bg-[#f73e41] hover:text-white border border-black w-1/2 h-full rounded-full'>
                Ik ben ziek
              </button>
            </div>

          </div>

          <div className="w-1/3 h-full shadow-md rounded-2xl bg-[#eae9e9] border border-slate-200">
            <div className="w-full h-1/10 p-2 flex justify-center items-center text-2xl font-bold">
              <p>Apps</p>
            </div>

            <div className="h-9/10 w-full flex justify-center items-center">
              <div className='h-9/10 w-9/10 grid grid-cols-3 grid-rows-2 justify-items-center items-center'>
                {
                  managerNavigation.map(({ label, path, icon: Icon }) => {
                    return (
                      <div className="bg-[#d4d0d078] shadow-md hover:border hover:border-[#9c9c9c] rounded-2xl h-8/10 w-9/10">
                        <NavLink key={label} to={path} className={"h-full flex flex-col items-center justify-center"}>
                          <Icon size={"80%"} strokeWidth={1.8} />
                          <p>{label}</p>
                        </NavLink>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-2/5 flex flex-col items-center shadow-md rounded-2xl bg-[#eae9e9] border border-slate-200 overflow-y-scroll">
          <div className="w-9/10 h-1/10 sticky top-0 py-2 grid grid-cols-3 text-center text-2xl font-bold bg-[#eae9e9]">
            <p>Aanvraag</p>
            <p>Reden</p>
            <p>Status</p>
          </div>

          <div className="w-9/10 h-9/10 flex flex-col gap-y-2 items-center">
            {
              mockMan.messages.map((message) => {
                return <NotificationManager message={message} />;
              })
            }
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
