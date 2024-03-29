import { transform } from "./utilities";

export interface TestCase {
  input: string;
  currentTime: string;
  expectedOutput: string;
}

const testData: TestCase[] = [
  {
    input: "30 1 /bin/run_me_daily",
    currentTime: "16:10",
    expectedOutput: "1:30 tomorrow - /bin/run_me_daily",
  },
  {
    input: "45 1 /bin/run_me_daily",
    currentTime: "16:10",
    expectedOutput: "1:45 tomorrow - /bin/run_me_daily",
  },
  {
    input: "45 * /bin/run_me_hourly",
    currentTime: "16:10",
    expectedOutput: "16:45 today - /bin/run_me_hourly",
  },
  {
    input: "* * /bin/run_me_every_minute",
    currentTime: "16:10",
    expectedOutput: "16:10 today - /bin/run_me_every_minute",
  },
  {
    input: "* 19 /bin/run_me_sixty_times",
    currentTime: "16:10",
    expectedOutput: "19:00 today - /bin/run_me_sixty_times",
  },
  {
    input: "45 19 /bin/run_me_sixty_times",
    currentTime: "19:10",
    expectedOutput: "19:45 today - /bin/run_me_sixty_times",
  },
  {
    input: "45 19 /bin/run_me_sixty_times",
    currentTime: "19:45",
    expectedOutput: "19:45 today - /bin/run_me_sixty_times",
  },
  {
    input: "15 * /bin/run_me_sixty_times",
    currentTime: "20:30",
    expectedOutput: "21:15 today - /bin/run_me_sixty_times",
  },
  {
    input: "15 * /bin/run_me_sixty_times",
    currentTime: "23:30",
    expectedOutput: "00:15 tomorrow - /bin/run_me_sixty_times",
  },
  {
    input: "* 19 /bin/run_me_sixty_times",
    currentTime: "20:10",
    expectedOutput: "19:00 tomorrow - /bin/run_me_sixty_times",
  },
  {
    input: "18 3 foo",
    currentTime: "15:33",
    expectedOutput: "3:18 tomorrow - foo",
  },
  {
    input: "8 10 foo",
    currentTime: "12:30",
    expectedOutput: "10:08 tomorrow - foo",
  },
];

testData.forEach((tc: TestCase) => {
  test(`transform ${tc.input}, ${tc.currentTime} -> ${tc.expectedOutput}`, () => {
    expect(transform(tc.input, tc.currentTime)).toEqual(tc.expectedOutput);
  });
});
