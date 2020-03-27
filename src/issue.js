class Issue {
    id;
    client_id;
    done;
    title;
    due_date;
    priority;
    project_id;
    project_client_id;

    constructor(id, client_id, done, title, due_date, priority, project_id, project_client_id) {
        this.id = id;
        this.client_id = client_id;
        this.done = done;
        this.title = title;
        this.due_date = due_date;
        this.priority = priority;
        this.project_id = project_id;
        this.project_client_id = project_client_id;
    }

    getErrors() {
        let errors = [];

        if (["1", "2", "3"].indexOf(this.priority) === -1) {
            errors.push('priority');
        }

        if (!this.isValidDate()) {
            errors.push('due_date');
        }

        if (this.title.length === 0) {
            errors.push('title');
        }

        return errors;
    }

    isValidDate() {
        var matches = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(this.due_date);
        if (matches == null) return false;
        var y = matches[1];
        var m = matches[2] - 1;
        var d = matches[3];
        var composedDate = new Date(y, m, d);
        return composedDate.getDate() == d &&
            composedDate.getMonth() == m &&
            composedDate.getFullYear() == y;
    }

    assign(obj) {
        Object.assign(this, obj);
        let date = new Date(this.due_date);
        this.due_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    static fromObj(obj){
        return Object.assign(new Issue(), obj);
    }

    toJson() {
        return JSON.stringify({
            id: this.id,
            client_id: this.client_id,
            done: this.done,
            title: this.title,
            due_date: this.due_date,
            priority: this.priority,
            project_id: this.project_id,
            project_client_id: this.project_client_id
        });
    }

    save() {
        let url = 'https://zhaw-issue-tracker-api.herokuapp.com/api/projects/' + this.project_id + '/issues';
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
            tracker.save();
        });
    }

    delete() {
        if (this.id > 0) {
            $.ajax({
                method: 'DELETE',
                url: 'https://zhaw-issue-tracker-api.herokuapp.com/api/projects/' + this.project_id + '/issues/' + this.id
            });
        }
    }
}