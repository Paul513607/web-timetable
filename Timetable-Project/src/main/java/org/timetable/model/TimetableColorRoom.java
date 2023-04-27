package org.timetable.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.timetable.pojo.Resource;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimetableColorRoom implements TimetableColor {
    private Resource resource;
}
