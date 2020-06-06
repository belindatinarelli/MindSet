'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

let user = {
    nome: '',
    paura: {
        titolo: '',
        valore: 0
    },
    preoccupazione: {
        titolo: '',
        valore: 0
    },
};

let groundingCount = 0;

app.setHandler({
    LAUNCH() {
        //return this.toStateIntent('GroundingState', 'QueryIntent');
        return this.toStateIntent('PauraNameState', 'QueryIntent'); 
        //return this.toIntent('CiaoIntent');
    },

    CiaoIntent() {



        //this.tell('<speak><amazon:effect name="whispered">Ciao sono MindSet, e sono qui per aiutarti a superare i momenti di stress. Ti va di cominciare?</amazon:effect></speak>');

        let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

        bodyTemplate6.setToken('token')
            .setTextContent('<font size="4">Ciao sono <b>MindSet</b>, sono qui per aiutarti a superare i momenti di stress.<br></br>Sei pronto per cominciare?</font>')
            .setFullScreenImage({
                url: 'https://i.ibb.co/CPkR7VW/home.jpg',
            });

        this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
        this.ask('Ciao sono MindSet, sono qui per aiutarti a superare i momenti di stress. Sei pronto per cominciare?');

        this.followUpState('InizioState');
    },

    InizioState: {

        Unhandled() {
            this.ask('Scusa non ho capito puoi ripetere?');
        },

        YesIntent() {
            let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

            bodyTemplate6.setToken('token')
                .setTextContent('Cominciamo!<br></br>Come ti chiami?')
                .setFullScreenImage({
                    url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                });

            this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
            this.ask('Cominciamo! Come ti chiami?');
            this.removeState();

            this.followUpState('PosturaState');
        },

        NoIntent() {
            let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

            bodyTemplate6.setToken('token')
                .setTextContent('Vabene, a presto!')
                .setFullScreenImage({
                    url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                });

            this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
            this.tell('Vabene, a presto!');
        }
    },

    PosturaState: {

        Unhandled() {
            this.ask('Scusa non ho capito puoi ripetere?');
        },

        NomeIntent() {
            user.nome = this.$inputs.name.value

            let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

            bodyTemplate6.setToken('token')
                .setTextContent("<b>- Apri e rilassa le spalle,<br></br>- Porta il mento verso l'alto,<br></br>- E inizia a respirare profondamente.</b><br></br>Continua così fino alla fine.")
                .setFullScreenImage({
                    url: 'https://i.ibb.co/G9vQ9CG/esercizio1.jpg',
                });

            this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
            this.ask("Piacere " + user.nome + ". Adesso, apri e rilassa le spalle <break time='1s'/> Porta il mento verso l'alto <break time='1s'/> E inizia a respirare profondamente<amazon:breath/>.<break time='1s'/> Continua così, fino alla fine della nostra conversazione <break time='1s'/> quando sei pronto dimmi 'fatto!' </speak>");
            this.removeState();
        },

    },

    FattoIntent() {
        let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

        bodyTemplate6.setToken('token')
            .setTextContent("<b>Le emozioni non accadono, ma siamo noi a scatenarle.</b><br></br>Mandi dei messaggi espliciti al tuo cervello anche attraverso la postura che assumi: <br></br><b>- Se assumi una postura sulla difensiva, alimenterai il sentimento ansioso.<br></br>- Se assumi una postura rilassata e sicura puoi aiutare il suo cervello a non allarmarsi.</b>")
            .setFullScreenImage({
                url: 'https://i.ibb.co/G9vQ9CG/esercizio1.jpg',
            });

        this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
        this.ask("<speak>Vorrei confessarti un segreto, <amazon:effect name='whispered'> le emozioni non accadono, ma siamo noi a scatenarle! </amazon:effect> <break time='1s'/>  Attraverso la postura che assumi, puoi mandare messaggi espliciti al tuo cervello <break time='1s'/> Se sei sulla difensiva, puoi alimentare il sentimento ansioso, se ti concentri invece per assumere una postura rilassata e sicura, puoi aiutare il tuo cervello a non allarmarsi <break time='1s'/> Vuoi approfondire?</speak>");
        this.followUpState('PresenteState');

    },

    PresenteState: {

        Unhandled() {
            this.ask('Scusa ' + user.nome + ', non ho capito puoi ripetere?');
        },

        YesIntent() {
            let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

            bodyTemplate6.setToken('token')
                .setTextContent('La paura è un sentimento naturale, che ti porta ad assumere una postura sulla difensiva, chiudendo le spalle per occupare meno spazio possibile, facendo respiri più corti aumentando il tuo ritmo cardiaco, per preparare il tuo cuore al momento della fuga. Questa situazione di allerta del tuo corpo ti permette di rendere i tuoi sensi molto più percettivi nelle situazioni di pericolo. Ora che sai di non dover scappare da nessuna parte, modifica la tua postura per convincere il tuo cervello che va tutto bene.')
                .setFullScreenImage({
                    url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                });

            this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
            this.ask('La paura è un sentimento naturale, che ti porta ad assumere una postura sulla difensiva, chiudendo le spalle per occupare meno spazio possibile, facendo respiri più corti aumentando il tuo ritmo cardiaco, per preparare il tuo cuore al momento della fuga. Questa situazione di allerta del tuo corpo ti permette di rendere i tuoi sensi molto più percettivi nelle situazioni di pericolo. Ora che sai di non dover scappare da nessuna parte, modifica la tua postura per convincere il tuo cervello che va tutto bene. Vuoi andare avanti?');
            this.followUpState('PresenteState.NextState')
        },

        NextState: {
            YesIntent() {
                return this.toStateIntent('PresenteState', 'NoIntent')
            },

            NoIntent() {
                let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

                bodyTemplate6.setToken('token')
                    .setTextContent('Vabene, a presto!')
                    .setFullScreenImage({
                        url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                    });

                this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
                this.tell('Vabene ' + user.nome + ', a presto!');
            },
        },

        NoIntent() {
            let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

            bodyTemplate6.setToken('token')
                .setTextContent('Mentre sei in piedi, immagina di tenere i tuoi piedi saldi a terra. <br></br><b>Rifletti sulle sensazioni fisiche e sulle emozioni che provi</b>, ma non sui pensieri.')
                .setFullScreenImage({
                    url: 'https://i.ibb.co/yRjPzJN/esercizio2.jpg',
                });

            this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
            this.ask('Mentre ti alzi in piedi, immagina di tenere i tuoi piedi saldi a terra <break time="1s"/> Rifletti sulle sensazioni fisiche che provi <break time="1s"/> anche solo se hai freddo oppure caldo, e sulle emozioni che provi, ma non sui pensieri <break time="1s"/> Vuoi continuare?');
            this.removeState();

            this.followUpState('CuriositaPresenteState');
        },

    },

    CuriositaPresenteState: {

        Unhandled() {
            this.ask('Scusa non ho capito puoi ripetere?');
        },

        YesIntent() {
            let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

            bodyTemplate6.setToken('token')
                .setTextContent('L`ansia si innesca nel momento in cui ci concentriamo sul futuro e non sul presente.<br></br>Concentrarsi sulle sensazioni fisiche che hai in questo momento è utile per riportare l`attenzione sul presente.')
                .setFullScreenImage({
                    url: 'https://i.ibb.co/yRjPzJN/esercizio2.jpg',
                });

            this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
            this.ask('L`ansia si innesca nel momento in cui ci concentriamo sul futuro e non sul presente! Concentrarsi sulle sensazioni fisiche che hai in questo momento è utile per riportare l`attenzione sul presente <break time="1s"/> Vuoi fare il prossimo esercizio?');
            this.removeState();
            this.followUpState('GroundingState');
        },

        NoIntent() {
            let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

            bodyTemplate6.setToken('token')
                .setTextContent('Vabene, a presto!')
                .setFullScreenImage({
                    url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                });

            this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
            this.tell('Vabene ' + user.nome + ', a presto!');
        }
    },


    GroundingState: {

        Unhandled() {
            this.ask('Scusa ' + user.nome + ', non ho capito puoi ripetere?');
        },

        YesIntent() {
            let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

            bodyTemplate6.setToken('token')
                .setTextContent('Tecnica del Radicamento.<br></br>elenca:<br></br><b>5 cose che puoi vedere,<br></br>4 che puoi toccare,<br></br>3 che puoi ascoltare,<br></br>2 che puoi gustare,<br></br>1 che puoi odorare</b>')
                .setFullScreenImage({
                    url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                });

            this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
            this.ask('Ora ' + user.nome + ', vorrei che mi elencassi delle cose che ti circondano <break time="1s"/> comincia col dirmi la prima cosa che puoi vedere .');

            //this.followUpState('GroundingState');
        },

        NoIntent() {
            let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

            bodyTemplate6.setToken('token')
                .setTextContent('Vabene, a presto!')
                .setFullScreenImage({
                    url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                });

            this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
            this.tell('Vabene ' + user.nome + ', a presto!');
        },

        NextIntent() {
            let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

            bodyTemplate6.setToken('token')
                .setTextContent('<b>La tecnica del radicamento,</b> aiuta nei momenti di panico a distogliere la mente dal pensiero ossessivo Qual è la cosa che più ti crea <b>ansia?</b>')
                .setFullScreenImage({
                    url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                });

            this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
            this.ask('La tecnica del radicamento ti aiuta nei momenti di panico a distogliere la mente dal pensiero ossessivo, permettendoti di concentrarti solo sulle cose che ti circondano. <break time="1s"/> Ora vorrei che mi confidassi la paura che più ti crea ansia <break time="1s"/> Un esempio potrebbe essere la perdita della tua famiglia.');

            this.followUpState('PauraNameState');
        },

        QueryIntent() {
            groundingCount += 1;

            if (groundingCount < 2) {
                this.ask('Dimméné un altra');

            } else if (groundingCount == 2) {
                let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

                bodyTemplate6.setToken('token')
                    .setTextContent('Tecnica del Radicamento.<br></br>elenca:<br></br><b>4 che puoi toccare,<br></br>3 che puoi ascoltare,<br></br>2 che puoi gustare,<br></br>1 che puoi odorare</b>')
                    .setFullScreenImage({
                        url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                    });

                this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
                this.ask('Adesso Dimméné 4 che puoi toccare, dimmi la prima cosa')

            } else if (groundingCount > 2 && groundingCount < 4) {
                this.ask('Dimméné un altra');

            } else if (groundingCount == 4) {
                let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

                bodyTemplate6.setToken('token')
                    .setTextContent('Tecnica del Radicamento.<br></br>elenca:<br></br><b>3 che puoi ascoltare,<br></br>2 che puoi gustare,<br></br>1 che puoi odorare</b>')
                    .setFullScreenImage({
                        url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                    });

                this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
                this.ask('Adesso Dimméné 3 che puoi ascoltare, dimmi la prima cosa');

            } else if (groundingCount > 4 && groundingCount < 6) {
                this.ask('Dimméné un altra');

            } else if (groundingCount == 6) {
                let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

                bodyTemplate6.setToken('token')
                    .setTextContent('Tecnica del Radicamento.<br></br>elenca:<br></br><b>2 che puoi gustare,<br></br>1 che puoi odorare</b>')
                    .setFullScreenImage({
                        url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                    });

                this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
                this.ask('Adesso Dimméné 2 che puoi gustare, dimmi la prima cosa');

            } else if (groundingCount > 6 && groundingCount < 8) {
                this.ask('Dimméné un altra');
            } else if (groundingCount == 8) {
                let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

                bodyTemplate6.setToken('token')
                    .setTextContent('Tecnica del Radicamento.<br></br>elenca:<br></br><b>1 che puoi odorare</b>')
                    .setFullScreenImage({
                        url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                    });

                this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
                this.ask('Adesso Dimméné una che puoi odorare');

            } else {
                let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

                bodyTemplate6.setToken('token')
                    .setTextContent('<b>La tecnica del radicamento,</b> aiuta nei momenti di panico a distogliere la mente dal pensiero ossessivo Qual è la cosa che più ti crea <b>ansia?</b>')
                    .setFullScreenImage({
                        url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                    });

                this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
                this.ask('La tecnica del radicamento ti aiuta nei momenti di panico a distogliere la mente dal pensiero ossessivo, permettendoti di concentrarti solo sulle cose che ti circondano. <break time="1s"/> Ora vorrei che mi confidassi la paura che più ti crea ansia <break time="1s"/> Un esempio potrebbe essere la perdita della tua famiglia.');

                this.followUpState('PauraNameState');
            }


            // if (groundingCount < 5) {
            //     this.ask('Dimméné un altra');
            // }else if(groundingCount == 5){
            //     this.ask('Adesso Dimméné 4 che puoi toccare, dimmi la prima cosa')
            // }else if (groundingCount > 5 && groundingCount < 9) {
            //     this.ask('Dimméné un altra');
            // }else if (groundingCount == 9) {
            //     this.ask('Adesso Dimméné 3 che puoi ascoltare, dimmi la prima cosa');
            // }else if (groundingCount > 9 && groundingCount < 12) {
            //     this.ask('Dimméné un altra');   
            // }else if (groundingCount == 12) {
            //     this.ask('Adesso Dimméné 2 che puoi gustare, dimmi la prima cosa');
            // }else if (groundingCount > 12 && groundingCount < 14) {
            //     this.ask('Dimméné un altra');
            // }else if (groundingCount == 14) {
            //     this.ask('Adesso Dimméné una che puoi odorare');
            // }else{
            //     this.tell('La tecnica del radicamento aiuta nei momenti di panico a distogliere la mente dal pensiero ossessivo. Per adesso può bastare. quando avrai di nuovo bisogno di me chiamami. a presto');
            // }


        },

    },


    PauraNameState: {
        Unhandled() {
            this.ask('Scusa non ho capito puoi ripetere?')
        },

        QueryIntent() {
            let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

            bodyTemplate6.setToken('token')
                .setTextContent('Quindi se ti chiedessi di dare un valore da 0 a 100 a questa preoccupazione, sarebbe 100, giusto?')
                .setFullScreenImage({
                    url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                });

            this.$alexaSkill.showDisplayTemplate(bodyTemplate6)
            //  user.paura.titolo = this.$inputs.cose.value;
            this.ask('Quindi se ti chiedessi di dare un valore da 0 a 100 a questa preoccupazione, sarebbe 100, giusto?');
            //console.log(this.$inputs.paura
            this.followUpState('PauraState')
        },
    },

    PauraState: {
        YesIntent() {
            let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

            bodyTemplate6.setToken('token')
                .setTextContent('Invece quale preoccupazione hai in questo momento?')
                .setFullScreenImage({
                    url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                });

            this.$alexaSkill.showDisplayTemplate(bodyTemplate6)

            this.ask('Invece quale preoccupazione hai in questo momento?');
            this.removeState();
        },

        NoIntent() {
            user.paura.titolo = this.$inputs.cose.value;

            this.ask('Allora quanto vale da 0 a 100 la paura ' + user.paura.titolo + ' per te?')
            this.followUpState('PauraValueState')
        }
    },

    PauraValueState: {
        ValoreIntent() {
            let string = this.$inputs.numero.value;
            let numero1 = parseInt(string);
            user.paura.valore = numero1;

            if (numero1 >= 0 && numero1 <= 100) {
                let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

                bodyTemplate6.setToken('token')
                    .setTextContent('Invece quale preoccupazione hai in questo momento?')
                    .setFullScreenImage({
                        url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                    });

                this.$alexaSkill.showDisplayTemplate(bodyTemplate6)

                this.ask('Invece, quale preoccupazione hai in questo momento?')
            } else {
                this.ask('Dimmi un valore compreso tra 0 e 100 perfavore')
            }

        },
    },

    QueryIntent() {
        user.preoccupazione.titolo = this.$inputs.cose.value;
        let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

        bodyTemplate6.setToken('token')
            .setTextContent('Quanto vale questa preoccupazione da 0 a 100')
            .setFullScreenImage({
                url: 'https://i.ibb.co/CPkR7VW/home.jpg',
            });

        this.$alexaSkill.showDisplayTemplate(bodyTemplate6)

        this.ask('Quanto vale questa preoccupazione da 0 a 100');
        this.followUpState('PreoccupazioneValueState')
    },

    PreoccupazioneValueState: {
        ValoreIntent() {
            let string = this.$inputs.numero.value;
            let numero2 = parseInt(string);
            user.preoccupazione.valore = numero2;

            let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

            bodyTemplate6.setToken('token')
                .setTextContent('La tua preoccupazione, vale ' + (numero2 - user.paura.valore) + ' volte meno rispetto alla tua più grande paura')
                .setFullScreenImage({
                    url: 'https://i.ibb.co/S7Xqm1t/percentuale.jpg',
                });

            this.$alexaSkill.showDisplayTemplate(bodyTemplate6)

            if (numero2 >= 0 && numero2 <= 100) {

                //Perché mi fa un calcolo sbagliato???????????????????
                let differenza = user.paura.valore - numero2
                
                this.ask('La tua preoccupazione, vale ' + differenza + ' volte meno rispetto alla tua più grande paura, non è la cosa peggiore del mondo, giusto?')
                this.followUpState('CinqueState')
            } else {
                this.ask('Dimmi un valore compreso tra 0 e 100 perfavore')
            }

        },
    },


    CinqueState: {
        YesIntent() {
            let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

            bodyTemplate6.setToken('token')
                .setTextContent('Secondo te, il peggiore degli scenari influenzerà ancora la tua vita tra cinque giorni?')
                .setFullScreenImage({
                    url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                });

            this.$alexaSkill.showDisplayTemplate(bodyTemplate6)

            this.ask('Secondo te, il peggiore degli scenari influenzerà ancora la tua vita tra cinque giorni?')
            this.followUpState('CinqueState.Cinque1State')
        },

        NoIntent() {
            this.ask('Mi dispiace che tu lo creda, ma nonostante tutto, pensi che influenzerà ancora la tua vita tra cinque giorni?')
            this.followUpState('CinqueState.Cinque1State')
        },

        Cinque1State: {
            YesIntent() {
                let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

                bodyTemplate6.setToken('token')
                    .setTextContent('Secondo te, il peggiore degli scenari influenzerà ancora la tua vita<br></br><b>- Tra cinque giorni?<br></br>- Tra cinque mesi?</b>')
                    .setFullScreenImage({
                        url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                    });

                this.$alexaSkill.showDisplayTemplate(bodyTemplate6)

                this.ask('Tra cinque mesi?')
                this.followUpState('CinqueState.Cinque2State')
            },

            NoIntent() {
                this.ask('Tra cinque mesi?')
                this.followUpState('CinqueState.Cinque2State')
            }
        },

        Cinque2State: {
            YesIntent() {
                let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

                bodyTemplate6.setToken('token')
                    .setTextContent('Secondo te, il peggiore degli scenari influenzerà ancora la tua vita<br></br><b>- Tra cinque giorni?<br></br>- Tra cinque mesi?<br></br>- Tra cinque anni?</b>')
                    .setFullScreenImage({
                        url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                    });

                this.$alexaSkill.showDisplayTemplate(bodyTemplate6)

                this.ask('Tra cinque anni?')
                this.followUpState('EndState')
            },

            NoIntent() {
                this.ask('Tra cinque anni?')
                this.followUpState('EndState')
            }
        },
    },



    EndState: {
        YesIntent() {
            let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

            bodyTemplate6.setToken('token')
                .setTextContent('Sono sicura che riuscirò a farti cambiare opinione, sei una splendida persona e non dovresti sentirti così insicuro. Ti va di impostare un promemoria?')
                .setFullScreenImage({
                    url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                });

            this.$alexaSkill.showDisplayTemplate(bodyTemplate6)

            this.ask('Sono sicura che riuscirò a farti cambiare opinione ' + user.nome + ', sei una splendida persona e non dovresti sentirti così insicuro. Ti va di impostare un promemoria per parlare un po anche domani?')
            this.followUpState('ReminderState')
        },

        NoIntent() {
            let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

            bodyTemplate6.setToken('token')
                .setTextContent('Sei una splendida persona e non dovresti sentirti così insicuro. Ti va di impostare un promemoria?')
                .setFullScreenImage({
                    url: 'https://i.ibb.co/CPkR7VW/home.jpg',
                });

            this.$alexaSkill.showDisplayTemplate(bodyTemplate6)

            this.ask('è stato piacevole parlare con te ' + user.nome + ', sei una splendida persona e non dovresti sentirti così insicuro. Vuoi impostare un promemoria per parlare un po’ anche domani?')
            this.followUpState('ReminderState')
        }
    },

    ReminderState: {
        YesIntent() {
            return this.toStateIntent('ReminderState', 'AddReminderIntent');
        },


        NoIntent() {

        },

        // Example
        async AddReminderIntent() {
            let date = new Date()
            let dateIso = date.toISOString().replace('Z', '');
            console.log(dateIso)
            const reminder = {
                "requestTime": dateIso,
                "trigger": {
                    "type": "SCHEDULED_RELATIVE",
                    "offsetInSeconds": "7"
                },
                "alertInfo": {
                    "spokenInfo": {
                        "content": [{
                            "locale": "en-US",
                            "text": "walk the dog",
                            "ssml": "<speak> walk the dog</speak>"
                        }]
                    }
                },
                "pushNotification": {
                    "status": "ENABLED"
                }
            }

            try {
                const result = await this.$alexaSkill.$user.setReminder(reminder);

                this.tell('A domani!');

            } catch (error) {
                if (error.code === 'NO_USER_PERMISSION') {
                    this.tell('Please grant the permission to set reminders.');
                } else {
                    console.error(error);
                    // Do something
                }
            }
        },
    }



    // PauraNameState: {
    //     Unhandled() {
    //         let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');
    
    //         bodyTemplate6.setToken('token')
    //             .setTextContent('<font size="6"><b>Scusa non ho capito puoi ripetere?</b></font>')
    //             .setFullScreenImage({
    //                 url: 'https://i.ibb.co/wK6HLqg/home.jpg',
    //             });
    
    //         this.$alexaSkill.showDisplayTemplate(bodyTemplate6).ask('Scusa non ho capito puoi ripetere?');
    //     },
    
    //         PauraIntent() {
    //             user.nome = this.$inputs.name.value
    //             // user.paura.titolo = this.$inputs.paura.value;
    //             // + user.paura.titolo
    
    //             let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');
    
    //             bodyTemplate6.setToken('token')
    //                 .setTextContent('<font size="6"><b>Hai ragione ' + user.nome + ', quest’idea fa paura.<br>Quindi se ti chiedessi di dare un valore da 0 a 100 a questa paura sarebbe 100 per te?</b></font>')
    //                 .setFullScreenImage({
    //                     url: 'https://i.ibb.co/wK6HLqg/home.jpg',
    //                 });
    
    //             this.$alexaSkill.showDisplayTemplate(bodyTemplate6).ask('Hai ragione ' + user.nome + ', quest’idea fa paura. Quindi se ti chiedessi di dare un valore da 0 a 100 a questa paura sarebbe 100 per te?');
    
    //             this.followUpState('PauraState')
    //         },
    //     },
    
});

module.exports.app = app;












//     ComeTiChiamiIntent() {
//         let bodyTemplate6 = this.$alexaSkill.templateBuilder('BodyTemplate6');

//         bodyTemplate6.setToken('token')
//             .setTextContent('<font size="6"><b>Ciao, come ti chiami?</b></font>')
//             .setFullScreenImage({
//                 url: 'https://i.ibb.co/wK6HLqg/home.jpg',
//             });

//         this.$alexaSkill.showDisplayTemplate(bodyTemplate6).ask('Ciao, come ti chiami?');


//         // let title = 'Ciao, come ti chiami?';
//         // let content = 'Il tuo nome';
//         // let imageUrl = 'https://i.ibb.co/vJrdmbC/prototipo.jpg';

//         // this.showImageCard(title, content, imageUrl)
//         //     .ask('Ciao, come ti chiami?');
//     },

//     IlMioNomeIntent() {

//         user.nome = this.$inputs.name.value
//         this.ask('Hey ' + user.nome + ', piacere di conoscerti! Qual è la cosa che più ti crea ansia? Ad esempio la perdita della mia famiglia');
//         //console.log(this.$inputs.name.value)
//         this.followUpState('PauraNameState')
//     },

//     // PauraNameState: {
//     //     Unhandled() {
//     //         this.ask('Scusa non ho capito puoi ripetere?')
//     //     },
//     //     PauraPiuGrandeIntent() {
//     //         user.paura.titolo = this.$inputs.paura.value;
//     //         this.ask('La tua più grande paure è questa?' + user.paura.titolo);
//     //         //console.log(this.$inputs.paura
//     //         this.followUpState('PauraState')
//     //     },
//     // },

//     PauraState: {
//         YesIntent() {
//             this.ask('Che valore dai a questa cosa da 0 a 100?');
//         },

//         NoIntent() {
//             this.ask('Puoi ripetere?');
//         }
//     },

//     ValoreIntent() {
//         let string = this.$inputs.numero.value;
//         let numero = parseInt(string);
//         user.paura.valore = numero;

//         if (numero >= 0 && numero <= 100) {
//             this.ask('Quindi ' + user.paura.titolo + ' per te vale ' + (numero - 1) + '?')
//         } else {
//             this.ask('Dimmi un valore compreso tra 0 e 100 perfavore')
//         }
//         this.followUpState('IndagineState')
//     },

//     IndagineState: {
//         YesIntent() {
//             this.ask('Hai delle preoccupazioni in questo momento?');
//             this.followUpState('NuovoState')
//         },

//         NoIntent() {
//             this.ask('Che valora dai allora a ' + user.paura.titolo + ' ?');
//         }
//     },

