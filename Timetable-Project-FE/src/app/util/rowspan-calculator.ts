import { AssignedTimetableEvent } from "src/app/model/assigned-timetable-event";

export class RowSpanCalculator {
    public initSpans(timetableData: any[], columns: string[]): Array<Span[]> {
        const spans: Array<Span[]> = new Array(timetableData.length);
        for (let rowIdx = 0; rowIdx < timetableData.length; rowIdx++) {
            spans[rowIdx] = new Array(columns.length);
        }
        return spans;
    }

    public calculateSpans(timetableData: any[], columns: string[]): Array<Span[]> {
        const spans: Array<Span[]> = this.initSpans(timetableData, columns);

        for (let rowIdx = 0; rowIdx < timetableData.length; rowIdx++) {
            let row: { [key: string]: AssignedTimetableEvent } = {};
            row = timetableData[rowIdx];
            spans[rowIdx][0] = {span: 1};
            for (let colIdx = 1; colIdx < columns.length; colIdx++) {
                const day: string = columns[colIdx];
                const assignedEvent: AssignedTimetableEvent = row[day] as AssignedTimetableEvent;

                let spanShouldBeZero: boolean = false;
                for (let prevRowIdx = 1; prevRowIdx < rowIdx; prevRowIdx++) {
                    let prevRowSpan: Span = spans[prevRowIdx][colIdx - 1];
                    if (rowIdx - (prevRowIdx + prevRowSpan.span) < 0) {
                        spans[rowIdx][colIdx - 1] = {span: 0};
                        spanShouldBeZero = true;
                        break;
                    }
                }

                if (spanShouldBeZero) {
                    continue;
                }

                if (assignedEvent.event != null && assignedEvent.time != null) {
                    spans[rowIdx][colIdx - 1] = {span: assignedEvent.event.duration};
                } else {
                    spans[rowIdx][colIdx - 1] = {span: 1};
                }
            }
        }

        for (let row = 0; row < spans.length; row++) {
            if (spans[row] == null) {
                spans[row] = new Array(columns.length);
            }
            for (let col = 0; col < spans[row].length; col++) {
                if (spans[row][col] == null) {
                    spans[row][col] = {span: 1};
                }
            }
        }
        return spans;
    }
}


export interface Span {
    span: number;
}