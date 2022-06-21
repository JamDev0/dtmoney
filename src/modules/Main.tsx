
import { Logs } from "./Logs";
import { LogsResume } from "./LogsResume";


export function Main() {
    return(
        <main
         className="
            pl-6
            md:px-[160px]
         "
        >
            <LogsResume/>

            <Logs/>
        </main>
    )
}