<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyUsers extends Mailable
{
    use Queueable, SerializesModels;

    private $emailData;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($emailData)
    {
        $this->emailData = $emailData;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        var_dump($this->emailData)
        return $this->view('emails')
            ->subject($this->emailData['subject'])
            ->with([
                'header' => $this->emailData->header,
                'content' => $this->emailData->content,
            ]);
    }
}
