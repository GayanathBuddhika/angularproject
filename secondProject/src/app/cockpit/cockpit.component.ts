import { Component, OnInit , EventEmitter , Output} from '@angular/core';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated= new EventEmitter();
  @Output() bluprintCreated=new EventEmitter();
  newServerName;
  newServerContent;
 

  constructor() { }

  ngOnInit() {
  }
  onAddServer(){
    console.log(11111);
this.serverCreated.emit({
  name:this.newServerName,
  content:this.newServerContent

});
  }  
  onAddBluePrint(){
    this.bluprintCreated.emit({
      name:this.newServerName,
      content:this.newServerContent
    
    });
  }

}
