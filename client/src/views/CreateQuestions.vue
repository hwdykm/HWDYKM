<template>
    <div class="container my-5" id="form-question">
        <h3 class="form-space">Question Form</h3>

        <form @submit.prevent="addQuestion">
                <div class="row">
                    <div class="input-field col s6 offset-s3">
                        <input placeholder="What is my favorite food?" id="first_name2" type="text" class="validate" v-model="question">
                        <label class="active label-form" for="first_name2">Question</label>
                    </div>
                </div>

                <h5 class="my-3">Answers:</h5>
                <div class="row">
                    <div class="input-field col s6 offset-s3">
                        <input placeholder="Dog Food" id="first_name2" type="text" class="validate" v-model="option1">
                        <label class="active label-form" for="first_name2">Option 1</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6 offset-s3">
                        <input placeholder="Cat Food" id="first_name2" type="text" class="validate" v-model="option2">
                        <label class="active label-form" for="first_name2">Option 2</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6 offset-s3">
                        <input placeholder="Hippo's Food" id="first_name2" type="text" class="validate" v-model="option3">
                        <label class="active label-form" for="first_name2">Option 3</label>
                    </div>
                </div>
                <button class="btn waves-effect waves-light mr-3" type="submit" name="action">Next Question</button>  
                <span><button class="btn waves-effect waves-light" type="button" name="action">Done</button></span>
        </form>
    </div>    
</template>

<script>
import { db, firebase } from '@/api/firebase';
// import firebase from "firebase";
// var ref = new Firebase('https://how-well-do-you-know-me-aa191.firebaseio.com');

export default {
    name: 'question-form',
    data() {
        return {
            question: '',
            option1: '',
            option2: '',
            option3: '',
        }
    },
    methods: {
        addQuestion() {
            let newQuestion = {
                question: this.question,
                options: {
                    a: this.option1,
                    b: this.option2,
                    c: this.option3
                }
            }

            db
                .collection('hwdykm')
                .doc('I96iqHiMEt9FrJGounOq')
                .update({
                    questions: firebase.firestore.FieldValue.arrayUnion(newQuestion)
                })
                .then(() => {
                    console.log('success')
                    this.question = ''
                    this.option1 = ''
                    this.option2 = ''
                    this.option3 = ''
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
};
</script>

<style>
    .form-space {
        margin: 5 auto;
    }
    .my-5 {
        margin-top: 100px;
    }
    .my-3 {
        margin-top: 50px;
    }
    .label-form {
        font-weight: bold;
        font-size: 1.5em !important;
    }
    .mr-3 {
        margin-right: 100px;
    }
</style>
