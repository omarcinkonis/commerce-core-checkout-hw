<?php

//declare(strict_types=1);
// strict types are not enabled in any of your files

namespace App\Mail;

// unused imports
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TestEmail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        private $orderData, // missing type
    ) {
        $this->orderData = $orderData; // this doesn't do anything, construct sets this automatically
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Test Email',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.test',
            with: ['orderData' => $this->orderData]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
