package org.timetable.algorithm.partialcol.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.timetable.pojo.Resource;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDataNode implements GraphNode {
    private Resource resource;
}
