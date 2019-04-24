import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoGuard } from '../guards/autenticacao.guard';
import { NavController, MenuController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { UsuarioService } from '../provider/usuario.service';
import { DatabaseService } from '../provider/database.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder:FormBuilder, private router:Router, private menuCtrl:MenuController, private toastController: ToastController, private loadingController: LoadingController, private alertController: AlertController, private usuarioService: UsuarioService, private db:DatabaseService) { }


  ngOnInit() {    
    this.formulario = this.formBuilder.group({
      email:['', [Validators.email, Validators.required]],
      senha:['', [Validators.required, Validators.minLength(6)]]
    });
    this.db.createDatabase();
  }

  async presentToast(mensagem) { 
    const toast = await this.toastController.create({
       message: mensagem,
       position: 'bottom', 
       closeButtonText: "[X]", 
       showCloseButton: true, 
       duration: 2000 
    });
    toast.present();
  }

  async clicou() {
    let  logar = await this.usuarioService.logar(this.formulario.get('email').value, this.formulario.get('senha').value);
    if (logar) {                
          this.router.navigateByUrl('home/geral');
    } else  {
      this.presentToast('Email Ou Senha Incorreto(s)');  
      
    }
  }
 

   async cadastrar() {
    const alert = await this.alertController.create({
      header: 'Nova Conta',
      inputs: [
        {type:"email", placeholder: "Digite um e-mail", name:"login"},
        {type:"password", placeholder:"Digite sua senha", name:"senha"}
      ],
      buttons: [
        'Cancelar',
        {text: "Cadastrar", handler: (data) => {
          this.usuarioService.cadastro(data.login, data.senha);
          this.presentToast('Conta ' + data.login + ' criada');
        }}
      ]
    });
  
    await alert.present();
  }

}
