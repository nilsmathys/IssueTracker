class Project {
    id;
    client_id;
    title;
    active;
    issues = [];

    constructor(id, client_id, title, active) {
        this.id = id;
        this.client_id = client_id;
        this.title = title;
        this.active = active;
    }

    addIssue(issue) {
        this.issues.push(issue);
    }

    getIssue(uuid) {
        for (let i = 0; i < this.issues.length; i++) {
            if (this.issues[i].client_id === uuid) {
                return this.issues[i];
            }
        }
    }

    removeIssue(uuid) {
        for (let i = 0; i < this.issues.length; i++) {
            if (this.issues[i].client_id === uuid) {
                this.issues[i].delete();
                this.issues.splice(i, 1);
            }
        }
    }

    assign(obj) {
        Object.assign(this, obj);
    }

    static fromObj(obj) {
        return Object.assign(new Project(), obj);
    }

    toJson() {
        return JSON.stringify({
            id: this.id,
            client_id: this.client_id,
            title: this.title,
            active: this.active
        });
    }

    save() {
        let url = 'https://zhaw-issue-tracker-api.herokuapp.com/api/projects';
        let method = 'POST';
        if (this.id > 0) {
            url += '/' + this.id;
            method = 'PUT';
        }
        let obj = this;
        $.ajax({
            method: method,
            url: url,
            data: this.toJson(),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            obj.assign(data);
            for (let i = 0; i < obj.issues.length; i++) {
                obj.issues[i].project_id = obj.id;
                obj.issues[i].save();
            }
            tracker.save();
        });
    }

    delete() {
        for (let i = 0; i < this.issues.length; i++) {
            this.issues[i].delete();
        }
        if (this.id > 0) {
            $.ajax({
                method: 'DELETE',
                url: 'https://zhaw-issue-tracker-api.herokuapp.com/api/projects/' + this.id
            });
        }
    }
}