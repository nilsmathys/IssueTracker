describe("Tracker", function() {
  var tracker;

  describe("without saved data", function() {
    beforeEach(function () {
      localStorage.removeItem('tracker');
      tracker = new Tracker();
    });

    it("should contain default projects", function () {
      expect(tracker.projects[0].title).toEqual("Learn RiotJS");
      expect(tracker.projects[2].title).toEqual("Implement Project");
      expect(tracker.size()).toEqual(3);
    });

    it("should return project by client_id", function () {
      tracker.push(new Project(0, '21d1e049-edd7-4370-98fc-051776cc4a51', 'TEST'));
      expect(tracker.getProject('21d1e049-edd7-4370-98fc-051776cc4a51').title).toEqual("TEST");
    });

    it("should remove project by client_id", function () {
      tracker.push(new Project(0, '21d1e049-edd7-4370-98fc-051776cc4a51', 'TEST'));
      expect(tracker.getProject('21d1e049-edd7-4370-98fc-051776cc4a51').title).toEqual("TEST");
      expect(tracker.size()).toEqual(4);
      tracker.removeProject('21d1e049-edd7-4370-98fc-051776cc4a51');
      expect(tracker.size()).toEqual(3);
    });
  });

  describe("with saved data", function() {
    beforeEach(function () {
      localStorage.setItem(
          'tracker',
          '[' +
          '  {' +
          '    "id": 0,' +
          '    "client_id": "c58b8e7c-f066-4b05-99ee-abb1fd4a5c1a",' +
          '    "title": "Project 001",' +
          '    "active": true,' +
          '    "issues": [' +
          '      {' +
          '        "id": 0,' +
          '        "client_id": "1d17c924-5c83-4bc3-ba53-b0f2c8f09b8f",' +
          '        "done": false,' +
          '        "title": "Issue 001",' +
          '        "due_date": "2019-11-11",' +
          '        "priority": 1' +
          '      },' +
          '      {' +
          '        "id": 0,' +
          '        "client_id": "6322d0fe-b436-4461-8c67-ae4dac268e51",' +
          '        "done": true,' +
          '        "title": "Issue 002",' +
          '        "due_date": "2019-11-11",' +
          '        "priority": 1' +
          '      }' +
          '    ]' +
          '  },' +
          '  {' +
          '    "id": 0,' +
          '    "client_id": "c58b8e7c-f066-4b05-99ee-abb1fd4a5c1a",' +
          '    "title": "Project 001",' +
          '    "active": true,' +
          '    "issues": []' +
          '  }' +
          ']'
      );
      tracker = new Tracker();
    });

    it("should contain loaded projects", function () {
      expect(tracker.projects[0].title).toEqual("Project 001");
      expect(tracker.size()).toEqual(2);
      expect(tracker.projects[0].issues.length).toEqual(2);
      expect(tracker.projects[0].issues[1].title).toEqual("Issue 002");
    });

    it("should return project by client_id", function () {
      expect(tracker.getProject('c58b8e7c-f066-4b05-99ee-abb1fd4a5c1a').title).toEqual("Project 001");
    });

    it("should remove project by client_id", function () {
      expect(tracker.getProject('c58b8e7c-f066-4b05-99ee-abb1fd4a5c1a').title).toEqual("Project 001");
      expect(tracker.size()).toEqual(2);
      tracker.removeProject('c58b8e7c-f066-4b05-99ee-abb1fd4a5c1a');
      expect(tracker.size()).toEqual(1);
    });
  });
});
