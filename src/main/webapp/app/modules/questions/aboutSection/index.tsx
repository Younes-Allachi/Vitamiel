import React, { useState } from 'react';
import { Translate } from 'react-jhipster';
import './aboutSection.scss';

const FaqSection: React.FC = () => {
  const faqItems = [
    {
      questionKey: 'faqSection.questions[0].question',
      answerKey: 'faqSection.questions[0].answer',
    },
    {
      questionKey: 'faqSection.questions[1].question',
      answerKey: 'faqSection.questions[1].answer',
    },
    {
      questionKey: 'faqSection.questions[2].question',
      answerKey: 'faqSection.questions[2].answer',
    },
    {
      questionKey: 'faqSection.questions[3].question',
      answerKey: 'faqSection.questions[3].answer',
    },
    {
      questionKey: 'faqSection.questions[4].question',
      answerKey: 'faqSection.questions[4].answer',
    },
    {
      questionKey: 'faqSection.questions[5].question',
      answerKey: 'faqSection.questions[5].answer',
    },
    {
      questionKey: 'faqSection.questions[6].question',
      answerKey: 'faqSection.questions[6].answer',
    },
    {
      questionKey: 'faqSection.questions[7].question',
      answerKey: 'faqSection.questions[7].answer',
    },
    {
      questionKey: 'faqSection.questions[8].question',
      answerKey: 'faqSection.questions[8].answer',
    },
    {
      questionKey: 'faqSection.questions[9].question',
      answerKey: 'faqSection.questions[9].answer',
    },
    {
      questionKey: 'faqSection.questions[10].question',
      answerKey: 'faqSection.questions[10].answer',
    },
    {
      questionKey: 'faqSection.questions[11].question',
      answerKey: 'faqSection.questions[11].answer',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container faq-section section-padding p-t-0">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12">
            <div className="faq-area">
              <div className="faq-wrap">
                <h2>
                  <Translate contentKey="faqSection.mainTitle" />
                </h2>
                <div className="faq-list">
                  {faqItems.map((item, index) => (
                    <div key={index} className="faq-item">
                      <div className="faq-question" onClick={() => handleToggle(index)}>
                        <Translate contentKey={item.questionKey} />
                      </div>
                      {openIndex === index && (
                        <div className="faq-answer">
                          <p>
                            <Translate contentKey={item.answerKey} />
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
