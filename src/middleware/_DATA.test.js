const { _saveQuestionAnswer, _saveQuestion } = require("./_DATA");
describe("_saveQuestionAnswer", () => {
  it("should return true for correct parameters", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    });

    expect(response).toBeTruthy();
  });

  it("should return error for false parameters", async () => {
    await expect(
      _saveQuestionAnswer({
        authedUser: "sarahedo",
        qid: undefined,
        answer: "optionOne",
      })
    ).rejects.toBe("Please provide authedUser, qid, and answer");
  });
});

describe("_saveQuestion", () => {
  it("dispatches the correct action with the correct payload", async () => {
    const mockDispatch = jest.fn();
    const mockData = {
      author: "sarahedo",
      optionOneText: "Option One", // Đúng tham số
      optionTwoText: "Option Two", // Đúng tham số
    };

    const savedQuestion = await _saveQuestion(mockData)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "user/addQuestion",
      payload: expect.objectContaining({
        author: "sarahedo",
        optionOneText: "Option One",
        optionTwoText: "Option Two",
        createtime: expect.any(Number), // Kiểm tra createtime là số
        id: expect.any(String), // Kiểm tra id được tạo tự động
      }),
    });

    expect(savedQuestion).toMatchObject({
      author: "sarahedo",
      optionOneText: "Option One",
      optionTwoText: "Option Two",
    });
  });

  it("should return error for missing parameters", async () => {
    const mockDispatch = jest.fn();
    const mockData = {
      author: "sarahedo",
      optionOneText: "Option One",
      // optionTwoText bị thiếu
    };

    await expect(_saveQuestion(mockData)(mockDispatch)).rejects.toBe("Please provide optionOneText, optionTwoText, and author");
  });
});