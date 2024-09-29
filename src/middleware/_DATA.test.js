const { _saveQuestionAnswer, _saveQuestion, resetData } = require("./_DATA");

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
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: undefined,
      answer: "optionOne",
    }).catch((e) => e);

    expect(response).toBe("Please provide authedUser, qid, and answer");
  });
});


describe("_saveQuestion", () => {
  beforeEach(() => {
    resetData();
  });
  it("should resolve with formatted question object when provided correct parameters", async () => {
    const mockQuestion = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "sarahedo",
    };

    const response = await _saveQuestion(mockQuestion);

    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("timestamp");
    expect(response.author).toBe("sarahedo");
    expect(response.optionOne).toEqual({
      votes: [],
      text: "Option One",
    });
    expect(response.optionTwo).toEqual({
      votes: [],
      text: "Option Two",
    });

    // Kiểm tra rằng câu hỏi đã được thêm vào `questions`
    const { questions } = require("../middleware/_DATA"); // Điều chỉnh đường dẫn nếu cần
    expect(questions).toHaveProperty(response.id);
    expect(questions[response.id]).toEqual(response);
  });

  it("should reject with error message when missing optionOneText", async () => {
    const mockQuestion = {
      // optionOneText missing
      optionTwoText: "Option Two",
      author: "sarahedo",
    };

    await expect(_saveQuestion(mockQuestion)).rejects.toBe("Please provide optionOneText, optionTwoText, and author");
  });

  it("should reject with error message when missing optionTwoText", async () => {
    const mockQuestion = {
      optionOneText: "Option One",
      // optionTwoText missing
      author: "sarahedo",
    };

    await expect(_saveQuestion(mockQuestion)).rejects.toBe("Please provide optionOneText, optionTwoText, and author");
  });

  it("should reject with error message when missing author", async () => {
    const mockQuestion = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      // author missing
    };

    await expect(_saveQuestion(mockQuestion)).rejects.toBe("Please provide optionOneText, optionTwoText, and author");
  });

  it("should reject with error message when all parameters are missing", async () => {
    const mockQuestion = {};

    await expect(_saveQuestion(mockQuestion)).rejects.toBe("Please provide optionOneText, optionTwoText, and author");
  });
});
