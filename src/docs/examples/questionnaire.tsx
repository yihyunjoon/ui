import { useState } from "react";

import {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireTitle,
  QuestionnaireDescription,
  QuestionnaireChoices,
  QuestionnaireChoice,
  QuestionnaireSubmit,
  QuestionnaireActions,
} from "@/registry/base-nova/ui/questionnaire";

export default function Example() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="w-full max-w-sm">
      <Questionnaire
        items={[{ name: "role", choices: [{ value: "design" }, { value: "engineering" }] }]}
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <QuestionnaireItem name="role">
          <QuestionnaireTitle>What do you work on?</QuestionnaireTitle>
          <QuestionnaireDescription>Select your primary focus.</QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="design">Design</QuestionnaireChoice>
            <QuestionnaireChoice value="engineering">Engineering</QuestionnaireChoice>
          </QuestionnaireChoices>
        </QuestionnaireItem>
        <QuestionnaireActions>
          <QuestionnaireSubmit>Finish</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
      {submitted && (
        <p role="status" className="mt-3 text-sm">
          Thank you for your answer.
        </p>
      )}
    </div>
  );
}
