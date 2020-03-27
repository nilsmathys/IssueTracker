class Tracker {
    projects = [];

    constructor() {
        if (localStorage.getItem('tracker')) {
            let projects = JSON.parse(localStorage.getItem('tracker'));
            for (let i = 0; i < projects.length; i++) {
                var project = Project.fromObj(projects[i]);
                for (let j = 0; j < project.issues.length; j++) {
                    project.issues[j] = Issue.fromObj(project.issues[j]);
                }
                this.projects.push(project);
            }
        } else {
            this.reset();
        }
        this.saveProjects();
    }

    push(project) {
        this.projects.push(project);
    }

    get(index) {
        return this.projects[index];
    }

    getProject(uuid) {
        for (var i = 0; i < this.projects.length; i++) {
            if (this.projects[i].client_id === uuid) {
                return this.projects[i];
            }
        }
    }

    removeProject(uuid) {
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].client_id === uuid) {
                this.projects[i].delete();
                this.projects.splice(i, 1);
            }
        }
    }

    saveProjects() {
        for (let i = 0; i < this.projects.length; i++) {
            this.projects[i].save();
        }
    }

    size() {
        return this.projects.length;
    }

    save() {
        localStorage.setItem('tracker', JSON.stringify(this.projects));
    }

    reset() {
        let proj1 = new Project(0, uuidv4(), "Learn RiotJS", true);
        proj1.addIssue(new Issue(0, uuidv4(), false, "Read documentation", "2019-11-11", "1", 0, proj1.client_id));
        proj1.addIssue(new Issue(0, uuidv4(), false, "Do the exercise in RiotJS Guide", "2019-11-11", "1", 0, proj1.client_id));
        proj1.addIssue(new Issue(0, uuidv4(), false, "Test reactive data-flow in RiotJS", "2019-11-11", "1", 0, proj1.client_id));
        proj1.addIssue(new Issue(0, uuidv4(), true, "Enlist in Web Engineering", "2019-11-11", "1", 0, proj1.client_id));
        proj1.save();

        let proj2 = new Project(0, uuidv4(), "Project Planning", true);
        proj2.addIssue(new Issue(0, uuidv4(), false, "Issue #1", "2019-11-11", "1", 0, proj2.client_id));
        proj2.addIssue(new Issue(0, uuidv4(), true, "Issue #2", "2019-11-11", "1", 0, proj2.client_id));
        proj2.addIssue(new Issue(0, uuidv4(), false, "Issue #3", "2019-11-11", "1", 0, proj2.client_id));
        proj2.save();

        let proj3 = new Project(0, uuidv4(), "Implement Project", true);
        proj3.addIssue(new Issue(0, uuidv4(), false, "Issue #1", "2019-11-11", "1", 0, proj3.client_id));
        proj3.save();

        this.projects = [];
        this.projects.push(proj1);
        this.projects.push(proj2);
        this.projects.push(proj3);

        this.save();
    }
}