import { Component, OnInit } from '@angular/core';
import { DialogflowService } from '../dialogflow.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  constructor(private chat: DialogflowService) { };
  welcomeText: string;

  question: any;
  res: any;
  result: any;
  newQuestion: string;
  listOfQuestions: string[] = [];
  listOfResults: string[] = [];

  ngOnInit() {
    this.welcomeText = "Hi there"
  }

  askQuestion(value: any) {
    value.newQuestion = value.newQuestion.trim();
    if (value.newQuestion) {
      this.listOfQuestions.push(this.newQuestion);
      this.newQuestion = '';

      this.chat.getResponse(value.newQuestion).subscribe(res => {
        this.result = res;
        this.result = res.result.fulfillment.speech;
        this.listOfResults.push(res.result.fulfillment.speech);
      })
    }
  }

}
