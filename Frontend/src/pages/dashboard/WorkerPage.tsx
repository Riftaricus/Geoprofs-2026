import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { PieChart } from '@mui/x-charts/PieChart';
import { Notification } from "../../components/dasboard/Notification";
import { useState } from "react";
import { PopUp } from "../../components/dasboard/Popup";

// date 1 week, 5 days, 7 hours later for testing
// change to +6 to test the weeks disapearing, change to 0 to see only hours
let testDate = new Date();
testDate = new Date(testDate.getFullYear(), testDate.getMonth(), testDate.getDate() + 12, testDate.getHours() + 7);
console.log(testDate)

// test user object to test some features on the page
const mockUser = {
  fname: "John",
  lname: "Doe",
  leave: [
    { label: 'Dagen gebruikt', value: 12, color: '#ff6467' },
    { label: 'Dagen over', value: 18, color: '#05df72' }
  ],
  shift: {
    dateTime: testDate
  },
  messages: [
    {
      reason_sm: "geen vervanging",
      subject: "Verlofaanvraag #1",
      status: "rejected"
    },
    {
      subject: "Verlofaanvraag #2",
      status: "accepted"
    },
    {
      subject: "Verlofaanvraag #3",
      status: "pending"
    },
    {
      reason_sm: "geen vervanging",
      subject: "Verlofaanvraag #1",
      status: "rejected"
    },
    {
      subject: "Verlofaanvraag #2",
      status: "accepted"
    },
    {
      subject: "Verlofaanvraag #3",
      status: "pending"
    },
    {
      reason_sm: "geen vervanging",
      subject: "Verlofaanvraag #1",
      status: "rejected"
    },
    {
      subject: "Verlofaanvraag #2",
      status: "accepted"
    },
    {
      subject: "Verlofaanvraag #3",
      status: "pending"
    },
    {
      reason_sm: "geen vervanging",
      subject: "Verlofaanvraag #1",
      status: "rejected"
    },
    {
      subject: "Verlofaanvraag #2",
      status: "accepted"
    },
    {
      subject: "Verlofaanvraag #3",
      status: "pending"
    },
    {
      reason_sm: "geen vervanging",
      subject: "Verlofaanvraag #1",
      status: "rejected"
    },
    {
      subject: "Verlofaanvraag #2",
      status: "accepted"
    },
    {
      subject: "Verlofaanvraag #3",
      status: "pending"
    },
    {
      reason_sm: "geen vervanging",
      subject: "Verlofaanvraag #1",
      status: "rejected"
    },
    {
      subject: "Verlofaanvraag #2",
      status: "accepted"
    },
    {
      subject: "Verlofaanvraag #3",
      status: "pending"
    },
    {
      reason_sm: "geen vervanging",
      subject: "Verlofaanvraag #1",
      status: "rejected"
    },
    {
      subject: "Verlofaanvraag #2",
      status: "accepted"
    },
    {
      subject: "Verlofaanvraag #3",
      status: "pending"
    },
    {
      reason_sm: "geen vervanging",
      subject: "Verlofaanvraag #1",
      status: "rejected"
    },
    {
      subject: "Verlofaanvraag #2",
      status: "accepted"
    },
    {
      subject: "Verlofaanvraag #3",
      status: "pending"
    },
    {
      reason_sm: "geen vervanging",
      subject: "Verlofaanvraag #1",
      status: "rejected"
    },
    {
      subject: "Verlofaanvraag #2",
      status: "accepted"
    },
    {
      subject: "Verlofaanvraag #3",
      status: "pending"
    },
    {
      reason_sm: "geen vervanging",
      subject: "Verlofaanvraag #1",
      status: "rejected"
    },
    {
      subject: "Verlofaanvraag #2",
      status: "accepted"
    },
    {
      subject: "Verlofaanvraag #3",
      status: "pending"
    },
    {
      reason_sm: "geen vervanging",
      subject: "Verlofaanvraag #1",
      status: "rejected"
    },
    {
      subject: "Verlofaanvraag #2",
      status: "accepted"
    },
    {
      subject: "Verlofaanvraag #3",
      status: "pending"
    },
    {
      reason_sm: "geen vervanging",
      subject: "Verlofaanvraag #1",
      status: "rejected"
    },
    {
      subject: "Verlofaanvraag #2",
      status: "accepted"
    },
    {
      subject: "Verlofaanvraag #3",
      status: "pending"
    },
  ]
}

export function WorkerPage() {
  const [popUp, setPopUp] = useState(false);
  const curDate = new Date()

  // function to get date diffrence in workable format
  function ShiftDiff(shift: Date) {
    const MS_PER_HOUR = 1000 * 60 * 60;
    const MS_PER_DAY = MS_PER_HOUR * 24;
    const MS_PER_WEEK = MS_PER_DAY * 7;

    let ms: [string, string, number][] = [
      ["weken", "week", MS_PER_WEEK],
      ["dagen", "dag", MS_PER_DAY],
      ["uur", "uur", MS_PER_HOUR]
    ]

    const posixShift = Date.UTC(shift.getFullYear(), shift.getMonth(), shift.getDate(), shift.getHours());
    const posixCurrent = Date.UTC(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), curDate.getHours());

    let diff = Math.abs(posixShift - posixCurrent);

    return ms.map(([more, one, millis]) => {
      const result = Math.floor(diff / millis);
      diff %= millis;

      return {
        unit: result == 1 ? one : more,
        result,
      };
    });
  }

  function quickSick(response: Boolean) {
    if (response) {
      //hier komt de implementatie van ziek melden
      alert("ziekgemeld");
    }

    setPopUp(false);
  }

  const shiftDiff = ShiftDiff(mockUser.shift.dateTime);

  return (
    <DashboardLayout role="worker">
      <div className="h-full flex flex-col justify-around items-center w-full rounded-xl border border-slate-200 bg-[#F3F4F6] p-6 shadow-sm">
        {
          popUp &&
          <PopUp>
            <div className='w-8/10 h-8/10 flex justify-center items-center'>
              <div className='w-full h-full flex flex-col items-center p-2'>
                <p className='text-lg'>Weet je het zeker dat je jezelf wilt ziekmelden?</p>

                <div className='h-1/10 w-full flex justify-between items-center p-2'>
                  <button onClick={() => quickSick(true)} className='bg-[#05df72] hover:bg-[#05ba60] hover:text-white p-1 rounded-full w-20'>Ja</button>
                  <button onClick={() => quickSick(false)} className='bg-[#ff6467] hover:bg-[#f73e41] hover:text-white p-1 rounded-full w-20'>Nee</button>
                </div>
              </div>
            </div>
          </PopUp>
        }

        <div className="w-full h-fit flex justify-center">
          <h1 className="text-2xl h-fit font-semibold text-[#0E3A5B]">
            Welkom op je dashboard {mockUser.fname} {mockUser.lname}.
          </h1>
        </div>

        <div className="w-8/10 h-2/5 flex justify-center gap-x-10">
          <div className="w-1/3 h-full shadow-md rounded-2xl bg-[#eae9e9] border border-slate-200">
            <div className="w-full h-fit p-2 flex justify-center items-center text-2xl font-bold">
              <p>verlof saldo</p>
            </div>

            <div className="h-7/10 w-full flex justify-center items-center">
              <PieChart
                series={[{ innerRadius: "45%", outerRadius: "90%", data: mockUser.leave }]}
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
              <p>volgende dienst</p>
            </div>

            <div className="w-full h-9/10 gap-y-2 flex flex-col justify-center items-center">
              {
                shiftDiff.map(({ unit, result }) => {
                  if (result > 0) {
                    return <p className="text-3xl"><b>{result}</b> {unit}</p>;
                  }
                })
              }
              <div>
                <p className="text-3xl">Tot je volgende dienst</p>
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
              mockUser.messages.map((message) => {
                return <Notification message={message} />;
              })
            }
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
