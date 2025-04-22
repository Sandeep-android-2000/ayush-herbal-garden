import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fade-in">
      <!-- Hero Section -->
      <section class="relative bg-primary-800 text-white py-16">
        <div class="container-custom">
          <h1 class="text-4xl font-bold mb-4">About Virtual Herbal Garden</h1>
          <p class="text-xl max-w-2xl">
            Learn about our mission to make traditional medicinal plant knowledge accessible to everyone.
          </p>
        </div>
      </section>
      
      <!-- Mission Section -->
      <section class="section bg-white">
        <div class="container-custom">
          <div class="flex flex-col md:flex-row gap-16">
            <div class="md:w-1/2">
              <h2 class="text-3xl font-bold mb-6">Our Mission</h2>
              <p class="text-gray-700 mb-6">
                The Virtual Herbal Garden aims to bridge the gap between traditional medicinal plant knowledge and modern accessibility. By creating a digital platform where users can explore, learn, and understand the significance of various medicinal plants from the comfort of their homes, we're making the wealth of AYUSH wisdom available to everyone.
              </p>
              <p class="text-gray-700 mb-6">
                Our goal is to preserve and promote the rich heritage of medicinal plants used in Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy, while making this knowledge accessible to students, practitioners, and enthusiasts worldwide.
              </p>
              <p class="text-gray-700">
                Through interactive 3D models, comprehensive information, and virtual tours, we're creating an immersive educational experience that combines technology with traditional knowledge.
              </p>
            </div>
            <div class="md:w-1/2">
              <img 
                src="http://images.unsplash.com/photo-1669131080043-f69be198e64f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Medicinal plants" 
                class="w-full h-auto rounded-lg shadow-lg"
              >
            </div>
          </div>
        </div>
      </section>
      
      <!-- AYUSH Systems Section -->
      <section class="section bg-gray-50">
        <div class="container-custom">
          <h2 class="text-3xl font-bold mb-10 text-center">AYUSH Medical Systems</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Ayurveda -->
            <div class="card">
              <h3 class="text-xl font-bold mb-3 text-primary-700">Ayurveda</h3>
              <p class="text-gray-700 mb-4">
                Ayurveda is one of the world's oldest holistic healing systems, developed more than 3,000 years ago in India. It's based on the belief that health and wellness depend on a delicate balance between the mind, body, and spirit.
              </p>
              <p class="text-gray-700">
                Ayurvedic medicine uses herbs, special diets, and other unique health practices to prevent, heal, and promote wellbeing.
              </p>
            </div>
            
            <!-- Yoga & Naturopathy -->
            <div class="card">
              <h3 class="text-xl font-bold mb-3 text-primary-700">Yoga & Naturopathy</h3>
              <p class="text-gray-700 mb-4">
                Yoga is a physical, mental, and spiritual practice that originated in ancient India. It aims to integrate the body, mind, and spirit to achieve a state of enlightenment or oneness with the universe.
              </p>
              <p class="text-gray-700">
                Naturopathy is a form of alternative medicine that employs an array of pseudoscientific practices branded as "natural," "non-invasive," and promoting "self-healing."
              </p>
            </div>
            
            <!-- Unani -->
            <div class="card">
              <h3 class="text-xl font-bold mb-3 text-primary-700">Unani</h3>
              <p class="text-gray-700 mb-4">
                Unani medicine is a system of alternative medicine that originated in ancient Greece but is now practiced primarily in India. Unani medicine is based on the concept of the four humors: Phlegm, Blood, Yellow bile, and Black bile.
              </p>
              <p class="text-gray-700">
                The maintenance of proper balance among the four humors is considered essential for health.
              </p>
            </div>
            
            <!-- Siddha -->
            <div class="card">
              <h3 class="text-xl font-bold mb-3 text-primary-700">Siddha</h3>
              <p class="text-gray-700 mb-4">
                Siddha medicine is one of the oldest medical systems known to mankind. It originated in South India and is considered one of the most ancient traditional medical systems in existence.
              </p>
              <p class="text-gray-700">
                According to tradition, it was taught by Lord Shiva to his wife Parvati, who taught it to Nandi, who taught it to the Siddhars.
              </p>
            </div>
            
            <!-- Homeopathy -->
            <div class="card">
              <h3 class="text-xl font-bold mb-3 text-primary-700">Homeopathy</h3>
              <p class="text-gray-700 mb-4">
                Homeopathy is a medical system based on the belief that the body can cure itself. It uses the principle of "like cures like," where a substance that causes symptoms in a healthy person is used to treat similar symptoms in a sick person.
              </p>
              <p class="text-gray-700">
                Homeopathic remedies are made from natural substances like plants and minerals.
              </p>
            </div>
            
            <!-- Medicinal Plants -->
            <div class="card">
              <h3 class="text-xl font-bold mb-3 text-primary-700">Medicinal Plants</h3>
              <p class="text-gray-700 mb-4">
                Medicinal plants form the backbone of traditional healing practices across all AYUSH systems. These plants contain phytochemicals that have proven health benefits and therapeutic effects.
              </p>
              <p class="text-gray-700">
                Our Virtual Herbal Garden aims to document and preserve knowledge about these important plants for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Team Section -->
      <section class="section bg-white">
        <div class="container-custom">
          <h2 class="text-3xl font-bold mb-10 text-center">Our Team</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Team Member 1 -->
            <div class="text-center">
              <div class="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/72.jpg" 
                  alt="Dr. Priya Sharma" 
                  class="w-full h-full object-cover"
                >
              </div>
              <h3 class="text-xl font-bold mb-1">Dr. Priya Sharma</h3>
              <p class="text-primary-600 mb-3">Ayurvedic Practitioner</p>
              <p class="text-gray-600">
                Expert in traditional Ayurvedic herbs and their medicinal properties.
              </p>
            </div>
            
            <!-- Team Member 2 -->
            <div class="text-center">
              <div class="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Rajesh Kumar" 
                  class="w-full h-full object-cover"
                >
              </div>
              <h3 class="text-xl font-bold mb-1">Rajesh Kumar</h3>
              <p class="text-primary-600 mb-3">Lead Developer</p>
              <p class="text-gray-600">
                3D modeling expert and full-stack developer for the Virtual Herbal Garden.
              </p>
            </div>
            
            <!-- Team Member 3 -->
            <div class="text-center">
              <div class="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/32.jpg" 
                  alt="Dr. Maya Reddy" 
                  class="w-full h-full object-cover"
                >
              </div>
              <h3 class="text-xl font-bold mb-1">Dr. Maya Reddy</h3>
              <p class="text-primary-600 mb-3">Botanist</p>
              <p class="text-gray-600">
                Specializes in medicinal plant identification, cultivation, and conservation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Contact Section -->
      <section class="section bg-primary-50">
        <div class="container-custom">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Contact Us</h2>
            <p class="text-gray-700 max-w-2xl mx-auto">
              Have questions about the Virtual Herbal Garden or want to collaborate? 
              We'd love to hear from you!
            </p>
          </div>
          
          <div class="max-w-3xl mx-auto">
            <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" id="name" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
              </div>
              
              <div class="md:col-span-2">
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" id="subject" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
              </div>
              
              <div class="md:col-span-2">
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"></textarea>
              </div>
              
              <div class="md:col-span-2">
                <button type="button" class="btn-primary w-full md:w-auto">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class AboutComponent {
  
}