<template>
  <!-- Contact Section-->
  <section  class="page-section" id="contact">
    <div class="container">
        <!-- Contact Section Heading-->
        <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">{{title}}</h2>
        <!-- Icon Divider-->
        <div class="divider-custom">
            <div class="divider-custom-line"></div>
            <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
            <div class="divider-custom-line"></div>
        </div>
        <!-- Contact Section Form-->
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <!-- To configure the contact form email address, go to mail/contact_me.php and update the email address in the PHP file on line 19.-->
                <form id="contactForm" name="sentMessage" novalidate="novalidate">
                    <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                            <label>{{fields.name.label}}</label>
                            <input class="form-control" id="name" :type="fields.name.type" :placeholder="fields.name.label" :required="fields.name.required == 'true' " :data-validation-required-message="fields.name.emptyError" />
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                            <label>{{fields.email.label}}</label>
                            <input class="form-control" id="email" :type="fields.email.type" :placeholder="fields.email.label" :required="fields.name.required == 'true' " :data-validation-required-message="fields.email.emptyError" />
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                            <label>{{fields.phone.label}}</label>
                            <input class="form-control" id="phone" :type="fields.phone.type" :placeholder="fields.phone.label" :required="fields.phone.required == 'true'" :data-validation-required-message="fields.phone.emptyError" />
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                            <label>{{fields.message.label}}</label>
                            <textarea class="form-control" id="message" rows="5" :placeholder="fields.message.label" :required="fields.message.required == 'true'" :data-validation-required-message="fields.message.emptyError"></textarea>
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <br />
                    <div id="success"></div>
                    <div class="form-group"><button class="btn btn-primary btn-xl" id="sendMessageButton" type="submit">{{fields.send.label}}</button></div>
                </form>
            </div>
        </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Contactme',
  props: {
    title: String,
    fields: Object
  }
}
</script>
