describe("Issue", function() {
  var issue;

  beforeEach(function() {
    issue = new Issue(0, '81588b94-2464-43e4-9f33-1779c65dd81a', false, 'Issue #1', '20.02.2019', 3);
  });

  it("should contain correct values", function() {
    expect(issue.id).toEqual(0);
    expect(issue.client_id).toEqual('81588b94-2464-43e4-9f33-1779c65dd81a');
    expect(issue.done).toEqual(false);
    expect(issue.title).toEqual('Issue #1');
    expect(issue.due_date).toEqual('20.02.2019');
    expect(issue.priority).toEqual(3);
  });

  it("should return no errors if valid", function() {
    expect(issue.getErrors()).toEqual([]);
  });

  it("should handle wrong due_date", function() {
    issue.due_date = 'abc';
    expect(issue.getErrors()).toEqual(['due_date']);

    issue.due_date = '29.02.2019';
    expect(issue.getErrors()).toEqual(['due_date']);

    issue.due_date = '01.01.2000';
    expect(issue.getErrors()).toEqual([]);
  });

  it("should handle wrong priority", function() {
    issue.priority = 'abc';
    expect(issue.getErrors()).toEqual(['priority']);

    issue.priority = 0;
    expect(issue.getErrors()).toEqual(['priority']);

    issue.priority = 4;
    expect(issue.getErrors()).toEqual(['priority']);

    issue.priority = 2;
    expect(issue.getErrors()).toEqual([]);
  });

  it("should handle empty title", function() {
    issue.title = '';
    expect(issue.getErrors()).toEqual(['title']);

    issue.title = 'Test';
    expect(issue.getErrors()).toEqual([]);
  });
});
