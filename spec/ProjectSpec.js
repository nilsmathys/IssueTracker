describe("Project", function() {
  var project;

  beforeEach(function() {
    project = new Project(0, '81588b94-2464-43e4-9f33-1779c65dd81a', 'Titel ABC', true);
    project.addIssue(new Issue(0, 'f2cc155f-e9dc-4740-8815-adb98619ec8f'));
    project.addIssue(new Issue(5, '007d304c5-847b-4430-9850-119da976d875'));
    project.addIssue(new Issue(6, 'fcf4cf34-8456-4e05-a4b3-cdd1cb403872'));
    project.addIssue(new Issue(10, '2f7d4762-ad8d-49c8-a33c-a2f1a2882ceb'));
  });

  it("should contain correct values", function() {
    expect(project.id).toEqual(0);
    expect(project.client_id).toEqual('81588b94-2464-43e4-9f33-1779c65dd81a');
    expect(project.title).toEqual('Titel ABC');
    expect(project.active).toEqual(true);
  });

  it("should store issues", function() {
    expect(project.issues.length).toEqual(4);
    expect(project.issues[2].id).toEqual(6);
    expect(project.issues[3].client_id).toEqual('2f7d4762-ad8d-49c8-a33c-a2f1a2882ceb');
  });

  it("should return issue by client_id", function() {
    expect(project.getIssue('f2cc155f-e9dc-4740-8815-adb98619ec8f').id).toEqual(0);
    expect(project.getIssue('fcf4cf34-8456-4e05-a4b3-cdd1cb403872').id).toEqual(6);
  });

  it("should remove issue by client_id", function() {
    expect(project.issues.length).toEqual(4);
    expect(project.issues[1].id).toEqual(5);
    project.removeIssue('007d304c5-847b-4430-9850-119da976d875');
    expect(project.issues.length).toEqual(3);
    expect(project.issues[1].id).toEqual(6);
  });
});
