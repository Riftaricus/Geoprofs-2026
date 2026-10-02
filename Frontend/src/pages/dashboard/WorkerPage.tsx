import { BrowserView, MobileView } from "react-device-detect";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { PieChart } from '@mui/x-charts/PieChart';

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

const colors = Object.freeze({
  rejected: "#ff0000",
  pending: "#ffff00",
  accepted: "#00ff00",
});

const mockUser = {
  fname: "John",
  lname: "Doe",
  leave: [
    { label: 'Gebruikt', value: 30, color: '#ff0000' },
    { label: 'Over', value: 70, color: '#00C49F' }
  ],
  shift: {
    dateTime: new Date(2026, 10, 30, 9, 0)
  },
  notifications: {
    messages: {
      message: "Verlofaanvraag #241 afgewezen",
      color: ""
    }
  }
}

export function WorkerPage() {
  const curDate = new Date()

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

  const shiftDiff = ShiftDiff(mockUser.shift.dateTime);

  return (
    <DashboardLayout role="worker">
      <div className="h-full flex flex-col justify-around items-center w-full rounded-xl border border-slate-200 bg-[#F3F4F6] p-6 shadow-sm">
        <div className="w-full h-fit m-2 flex justify-center">
          <h1 className="text-2xl h-fit font-semibold text-[#0E3A5B]">
            Welkom op je dashboard {mockUser.fname} {mockUser.lname}.
          </h1>
        </div>

        <div className="w-8/10 h-2/5 flex justify-center gap-x-10">
          <div className="w-1/3 h-full rounded-2xl bg-[#eae9e9] border border-slate-200">
            <PieChart
              series={[{ innerRadius: 50, outerRadius: 100, data: mockUser.leave, arcLabel: 'value' }]}
            />
          </div>

          <div className="w-1/3 h-full rounded-2xl bg-[#eae9e9] border border-slate-200">
            <div className="w-full h-full m-2 gap-y-2 flex flex-col justify-center items-center">
              {
                shiftDiff.map(({ unit, result }) => {
                  if (result > 0) {
                    return <p className="text-3xl"><b>{result}</b> {unit}</p>;
                  }
                })
              }
              <div>
                <p className="text-3xl">Voor/Tot je volgende dienst</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-8/10 h-2/5 rounded-2xl bg-[#eae9e9] border border-slate-200">
          {/* notif component */}
          {
            mockUser.notifications.map()
          }
        </div>

      </div>
    </DashboardLayout>
  );
}
