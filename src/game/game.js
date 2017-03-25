export class Lab {
    constructor(professor) {
        this.projects = [];
        this.students = [];
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

export class Assignment {
    constructor(task) {
        this.task = task;
        this.students = {};
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
