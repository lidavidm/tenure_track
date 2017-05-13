/*********************************************************************
 * Copyright © 2017 David Li
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you
 * may not use this file except in compliance with the License.  You
 * may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied.  See the License for the specific language governing
 * permissions and limitations under the License.
 ********************************************************************/
export class Lab {
    constructor(professor) {
        this.projects = [];
        this.students = [];
        this.assignments = {};  // { project: {student: [tasks]}}
        this.funding = 0;
        this.professor = professor;
    }
}

export class Student {
    constructor(id, name, year, workUnits) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.workUnits = workUnits;
        this.specializations = [];
    }
}

export class Task {
    constructor(name, description, components) {
        this.name = name;
        this.description = description;
        this.components = components;
        // Components should be an array of work unit values
    }
}

export class Project {
    /**
     *
     *
     * @constructor
     * @param {string} name
     * @param {number} started - the time unit when started
     * @param {object} topicStructure - provide hash of primary
     * (topic), modifiers (topic list), and (optional)
     * interdisciplinary (topic)
     */
    constructor(name, started, topicStructure) {
        this.name = name;
        this.started = started;
        this.topicStructure = topicStructure;
        this.tasks = [];
    }
}

// export class FeatureTask extends Task {

// }

// export class VideoTask extends Task {

// }

// export class PosterTask extends Task {

// }

// export class DebugTask extends Task {

// }

// export class BackgroundResearchTask extends Task {

// }

// export class PrototypeTask extends Task {

// }
