import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { CannabisProduct } from "@/types/whiskey";
import { sanitizeInput } from "@/utils/tastingValidation";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const layAwaySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, "Invalid phone number").min(10).max(20),
  quantity: z.enum(["3.5", "7", "14", "28"], {
    required_error: "Please select a quantity",
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type LayAwayFormData = z.infer<typeof layAwaySchema>;

interface LayAwayModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: CannabisProduct;
}

export const LayAwayModal = ({ isOpen, onClose, product }: LayAwayModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<LayAwayFormData>({
    resolver: zodResolver(layAwaySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      quantity: "3.5",
      acceptTerms: false,
    },
  });

  const calculatePrice = (grams: string) => {
    const perGramPrice = product.price;
    const quantity = parseFloat(grams);
    let discount = 1;
    
    if (quantity === 7) discount = 0.95;
    else if (quantity === 14) discount = 0.90;
    else if (quantity === 28) discount = 0.85;
    
    return (perGramPrice * quantity * discount).toFixed(2);
  };

  const selectedQuantity = form.watch("quantity");
  const selectedPrice = selectedQuantity ? calculatePrice(selectedQuantity) : "0";

  const onSubmit = async (data: LayAwayFormData) => {
    setIsSubmitting(true);
    
    try {
      // Sanitize inputs
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email),
        phone: sanitizeInput(data.phone),
        quantity: data.quantity,
        productName: product.name,
        productId: product.id,
        price: calculatePrice(data.quantity),
      };

      // For now, just show success message
      // TODO: Implement edge function call when backend is set up
      console.log("Lay Away Request:", sanitizedData);
      
      toast({
        title: "Request Submitted!",
        description: "We'll contact you shortly to confirm your reservation.",
      });

      form.reset();
      onClose();
    } catch (error) {
      console.error("Error submitting lay away request:", error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reserve This Strain</DialogTitle>
          <DialogDescription>
            Request to set aside up to 1oz of {product.name}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-3 my-4 p-3 bg-secondary/50 rounded-lg">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-16 h-16 rounded object-cover"
          />
          <div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-muted-foreground">${product.price}/gram</p>
          </div>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            <strong>Important:</strong> This is NOT a shipping service. Reservations are for IN-STORE PICKUP ONLY. 
            Maximum hold period: 5 days. Maximum: 1oz per customer.
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Quantity</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-3"
                    >
                      {[
                        { value: "3.5", label: "3.5G", grams: "3.5" },
                        { value: "7", label: "7G", grams: "7" },
                        { value: "14", label: "14G", grams: "14" },
                        { value: "28", label: "1 OZ", grams: "28" },
                      ].map((option) => (
                        <div key={option.value} className="relative">
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                            className="peer sr-only"
                          />
                          <label
                            htmlFor={option.value}
                            className="flex flex-col items-center justify-center p-3 border-2 rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 hover:bg-secondary/50 transition-colors"
                          >
                            <span className="font-semibold">{option.label}</span>
                            <span className="text-sm text-primary font-bold">
                              ${calculatePrice(option.grams)}
                            </span>
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="p-3 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold text-primary">${selectedPrice}</p>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-xs">
                      I confirm I am 21+ years old and agree that this is an in-store pickup reservation only (not shipping). 
                      I understand the 5-day hold period and 1oz maximum limit.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Reservation Request"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
